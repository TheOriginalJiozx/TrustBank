import NextCors from "nextjs-cors";
import { getCategories } from "../../service/categorizeService";

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["GET"],
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  });

  try {
    const categories = getCategories();

    return res.status(200).json(categories);
  } catch (err) {
    console.error("Fejl i getCategories API:", err);
    return res.status(200).json({});
  }
}