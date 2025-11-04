import NextCors from "nextjs-cors";

async function getCompanyName(regNo, accNo) {
  const res = await fetch(`http://localhost:3001/api/findCompany?regNo=${regNo}&accNo=${accNo}`);
  const data = await res.json();
  return data.name;
}

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "http://localhost:3000",
  });

  if (req.method === "POST") {
    const { regNo, accNo, amount, category } = req.body;

    try {
      const company = await getCompanyName(regNo, accNo);

      res.status(200).json({
        status: "success",
        data: { company, accNo, regNo, amount, category },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Kunne ikke hente virksomhed" });
    }
  } else {
    res.status(405).json({ error: "Metode ikke tilladt" });
  }
}