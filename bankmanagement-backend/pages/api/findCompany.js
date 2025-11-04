import NextCors from "nextjs-cors";
import { findCompanyByAccount } from "../../service/categorizeService";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  });

  const { regNo, accNo } = req.query;

  if (!regNo || !accNo) {
    return res.status(400).json({ error: "regNo og accNo kræves" });
  }

  const company = findCompanyByAccount(regNo, accNo);

  if (!company) {
    return res.status(404).json({ error: "Virksomhed ikke fundet" });
  }

  res.status(200).json(company);
}