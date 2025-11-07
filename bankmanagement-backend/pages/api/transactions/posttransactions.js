import NextCors from "nextjs-cors";
import { findCompanyByAccount } from '../../../service/categorizeService';

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["POST", "OPTIONS"],
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  });

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Metode ikke tilladt" });
  }

  const { regNo, accNo, comment } = req.body;

  if (!regNo || !accNo) {
    return res.status(400).json({ error: "regNo og accNo skal angives" });
  }

  try {
    const company = findCompanyByAccount(String(regNo), String(accNo), comment || "");

    return res.status(200).json({
      name: company.name,
      category: company.category,
      regNo: company.regNo,
      accNo: company.accNo,
      comment: comment || company.comment || ""
    });
  } catch (err) {
    console.error("Fejl i posttransactions API:", err);
    return res.status(500).json({
      name: comment || "Ukendt firma",
      category: "Ukendt kategori",
      regNo,
      accNo,
      comment: comment || ""
    });
  }
}