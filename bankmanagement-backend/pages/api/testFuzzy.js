import { fuzzyMatch } from "../../service/categorizeService";

export default function handler(req, res) {
  const testCases = [
    "Betaling til Nettoo",
    "Spotify abonnement",
    "Mcdonalds burger",
    "El regning",
    "Ukendt firma",
    "Jeg tog lige Movai bussen"
  ];

  const results = testCases.map(desc => ({
    description: desc,
    category: fuzzyMatch(desc)
  }));

  res.status(200).json(results);
}