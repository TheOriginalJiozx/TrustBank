import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";

console.log("[directdebits] HIT", new Date().toISOString());

const dirPath = path.join(process.cwd(), "data");
const filePath = path.join(dirPath, "users.json");

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
  });

  if (req.method === "OPTIONS") return res.status(200).end();


  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, JSON.stringify({}, null, 2));

  let users = {};
  try {
    const data = fs.readFileSync(filePath, "utf8");
    users = data.trim() ? JSON.parse(data) : {};
  } catch {
    users = {};
  }


  const getCardsForUser = (username) => {
    const u = users[username];
    if (!u) return null;
    if (Array.isArray(u)) return u;

    return [u];
  };

  switch (req.method) {

    case "GET": {
      const { username, regNo, accNo } = req.query;

      if (username) {
        const cards = getCardsForUser(username);
        if (!cards) return res.status(404).json({ error: "Bruger findes ikke" });
        const list = cards.flatMap((c) => c.directDebits || []);
        return res.status(200).json(list);
      }

      if (regNo && accNo) {
        for (const uname in users) {
          const cards = getCardsForUser(uname) || [];
          const card = cards.find(
            (c) => String(c.regNo) === String(regNo) && String(c.accNo) === String(accNo)
          );
          if (card) return res.status(200).json(card.directDebits || []);
        }
        return res.status(404).json({ error: "Konto ikke fundet" });
      }

      return res.status(400).json({ error: "Angiv username eller (regNo & accNo)" });
    }


    case "POST": {
      const {
        username,
        regNo,
        accNo,
        company,
        amountMonthly,
        dayOfMonth,
        endDate,
        note = "",
      } = req.body || {};

      if (!username || !regNo || !accNo || !company || !amountMonthly || !dayOfMonth) {
        return res.status(400).json({ error: "Manglende felter" });
      }

      const cards = getCardsForUser(username);
      if (!cards) return res.status(404).json({ error: "Bruger findes ikke" });

      const card = cards.find(
        (c) => String(c.regNo) === String(regNo) && String(c.accNo) === String(accNo)
      );
      if (!card) return res.status(404).json({ error: "Kort/konto ikke fundet" });

      card.directDebits = card.directDebits || [];

      const newMandate = {
        id: crypto.randomUUID(),
        company: String(company).trim(),
        amountMonthly: Number(amountMonthly),
        dayOfMonth: Number(dayOfMonth),
        endDate: endDate || null,
        note: String(note || "").trim(),
        active: true,
        createdAt: new Date().toISOString(),
      };

      card.directDebits.push(newMandate);

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return res.status(200).json(newMandate);
    }


    case "DELETE": {
      const { id, username } = req.query;
      if (!id || !username) return res.status(400).json({ error: "id og username mangler" });

      const cards = getCardsForUser(username);
      if (!cards) return res.status(404).json({ error: "Bruger findes ikke" });

      let removed = null;
      for (const c of cards) {
        if (!Array.isArray(c.directDebits)) continue;
        const idx = c.directDebits.findIndex((d) => d.id === id);
        if (idx !== -1) {
          c.directDebits[idx].active = false;
          c.directDebits[idx].canceledAt = new Date().toISOString();
          removed = c.directDebits[idx];
          break;
        }
      }

      if (!removed) return res.status(404).json({ error: "Mandat ikke fundet" });

      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      return res.status(200).json(removed);
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
}
