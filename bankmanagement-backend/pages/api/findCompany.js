import NextCors from "nextjs-cors";
import { findCompanyAdvanced } from '../../service/categorizeService';

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET", "POST", "OPTIONS"],
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  });

  if (!["POST", "GET"].includes(req.method)) {
    return res.status(405).json({ error: "Metode ikke tilladt" });
  }

  const { creditorNo, referenceNo, fikNo } = req.method === "POST" ? req.body : req.query;

  if (!creditorNo || !referenceNo || !fikNo) {
    return res.status(400).json({ error: "creditorNo, referenceNo og fikNo skal angives" });
  }

  try {
    const company = findCompanyAdvanced(String(creditorNo), String(referenceNo), String(fikNo));

    return res.status(200).json({
      name: company.name,
      category: company.category,
      creditorNo: company.creditorNo,
      referenceNo: company.referenceNo,
      fikNo: company.fikNo
    });
  } catch (err) {
    console.error("Fejl i findCompany API:", err);
    return res.status(500).json({
      name: "Ukendt firma",
      category: "Ukendt kategori",
      creditorNo,
      referenceNo,
      fikNo,
    });
  }
}