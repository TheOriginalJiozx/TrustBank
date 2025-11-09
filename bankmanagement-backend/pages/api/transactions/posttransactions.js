import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";

const filePath = path.join(process.cwd(), "data", "users.json");

export default async function handler(req, res) {
  await NextCors(req, res, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    optionsSuccessStatus: 200,
  });

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "POST") {
    const {
      company,
      category,
      senderRegNo,
      senderAccNo,
      receiverCreditorNo,
      receiverReferenceNo,
      fikNo,
      amount,
      comment,
    } = req.body;

    let users = {};
    try {
      const data = fs.readFileSync(filePath, "utf8");
      users = data ? JSON.parse(data) : {};
    } catch (err) {
      console.error("Fejl ved læsning af users.json:", err);
      return res.status(500).json({ error: "Kunne ikke læse users.json" });
    }

    let sentTransaction = null;

    for (const username in users) {
      users[username].forEach((card) => {
        if (
          String(card.regNo) === String(senderRegNo).trim() &&
          String(card.accNo) === String(senderAccNo).trim()
        ) {
          card.transactions = card.transactions || [];
          const newTransaction = {
            company: company || "Ukendt virksomhed",
            category: category || "Ukendt kategori",
            receiverCreditorNo: String(receiverCreditorNo).trim(),
            receiverReferenceNo: String(receiverReferenceNo).trim(),
            fikNo,
            amount,
            comment,
            timestamp: new Date().toISOString(),
            type: "sent",
          };
          card.transactions.push(newTransaction);
          sentTransaction = newTransaction;
        }
      });
    }

    if (!sentTransaction)
      return res.status(404).json({ error: "Afsenderkort ikke fundet" });

    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
      console.error("Fejl ved gemning af users.json:", err);
      return res.status(500).json({ error: "Kunne ikke gemme data" });
    }

    return res.status(200).json({ sent: sentTransaction });
  }

  res.status(405).json({ error: "Metode ikke tilladt" });
}