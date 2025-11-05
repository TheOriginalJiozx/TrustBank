import NextCors from "nextjs-cors";

async function getCompanyName(regNo, accNo, description = "") {
  try {
    const res = await fetch(
      `http://localhost:3001/api/findCompany?regNo=${regNo}&accNo=${accNo}&description=${encodeURIComponent(description)}`
    );
    if (!res.ok) throw new Error("Netværksfejl");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Virksomheden findes ikke", err);
    return {
      name: description || "Ukendt firma",
      category: "Ukendt kategori",
      regNo,
      accNo
    };
  }
}

export default async function handler(req, res) {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "http://localhost:3000",
  });

  if (req.method === "POST") {
    const { regNo, accNo, description } = req.body;

    try {
      const company = await getCompanyName(regNo, accNo, description);

      res.status(200).json({
        status: "success",
        data: { company },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "Kunne ikke hente virksomhed" });
    }
  } else {
    res.status(405).json({ error: "Metode ikke tilladt" });
  }
}