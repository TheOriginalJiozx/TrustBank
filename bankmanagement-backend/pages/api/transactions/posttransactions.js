import fs from "fs";
import path from "path";
import NextCors from "nextjs-cors";
import { findCompanyAdvanced } from "../../../service/categorizeService.js";

const filePath = path.join(process.cwd(), "data", "users.json");

export function getNow() {
  return (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
}

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
      const cards = Array.isArray(users[username]) ? users[username] : [users[username]];
      cards.forEach((card) => {
        if (
          String(card.regNo) === String(senderRegNo).trim() &&
          String(card.accNo) === String(senderAccNo).trim()
        ) {
          card.transactions = card.transactions || [];
          const now = new Date();
          const timestampLocal = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
            .toISOString()
            .replace(/Z$/, "");
          
          const match = findCompanyAdvanced(
            String(receiverCreditorNo).trim(),
            String(receiverReferenceNo).trim(),
            String(fikNo || "").trim(),
            comment || ""
          );

          const newTransaction = {
            company: (match && match.name) || company || "Ukendt virksomhed",
            category: (match && match.category) || category || "Ukendt kategori",
            receiverCreditorNo: String(receiverCreditorNo).trim(),
            receiverReferenceNo: String(receiverReferenceNo).trim(),
            fikNo,
            amount,
            comment,
            timestamp: timestampLocal, // lokal tid, ingen UTC felt
            durationMs: match && match.durationMs ? match.durationMs : 0,
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