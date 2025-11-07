import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";

const filePath = path.join(process.cwd(), "data", "users.json");

export default async function handler(req, res) {
  // 🔹 CORS
  await NextCors(req, res, {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "OPTIONS"],
    optionsSuccessStatus: 200,
  });

  if (req.method === "OPTIONS") return res.status(200).end(); // preflight

  if (req.method === "POST") {
    const {
      company,
      category,
      senderRegNo,
      senderAccNo,
      receiverRegNo,
      receiverAccNo,
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

    let postedTransaction = null;

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
            receiverRegNo: String(receiverRegNo).trim(),
            receiverAccNo: String(receiverAccNo).trim(),
            amount,
            comment,
            timestamp: new Date().toISOString(),
          };
          card.transactions.push(newTransaction);
          postedTransaction = newTransaction;
        }
      });
    }

    if (!postedTransaction)
      return res.status(404).json({ error: "Kort ikke fundet" });

    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    } catch (err) {
      console.error("Fejl ved gemning af users.json:", err);
      return res.status(500).json({ error: "Kunne ikke gemme data" });
    }

    // Returner den postede transaction
    return res.status(200).json(postedTransaction);
  }

  res.status(405).json({ error: "Method not allowed" });
}