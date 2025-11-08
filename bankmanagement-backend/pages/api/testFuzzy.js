import { findCompanyByAccount } from "../../service/categorizeService";

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  const testCases = [
    "Betaling til Nettoo",
    "Spotify abonnement",
    "Mcdonalds burger",
    "El regning",
    "Ukendt firma",
    "Jeg tog lige Movai bussen"
  ];

  const results = testCases.map(description => {
    return findCompanyByAccount("", "", description);
  });

  res.status(200).json(results);
}