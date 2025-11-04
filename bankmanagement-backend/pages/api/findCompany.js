// pages/api/findCompany.js
import NextCors from "nextjs-cors";
import { findCompanyByAccount } from "../../service/categorizeService";

export default async function handler(req, res) {
  // 1. Tillad CORS først
  await NextCors(req, res, {
    methods: ["GET", "POST", "OPTIONS"],
    origin: "http://localhost:3000", // din frontend
    optionsSuccessStatus: 200,
  });

  const { regNo, accNo, description } = req.query;

  if (!regNo || !accNo) {
    return res.status(400).json({ error: "regNo og accNo skal angives" });
  }

  try {
    // 2. Sørg for regNo og accNo er strings (ellers kan findCompanyByAccount fejle)
    const company = findCompanyByAccount(String(regNo), String(accNo), description || "");

    return res.status(200).json(company);
  } catch (err) {
    console.error("Fejl i findCompany API:", err);
    return res.status(200).json({
      name: description || "Ukendt firma",
      category: "Ukendt kategori",
      regNo,
      accNo
    });
  }
}