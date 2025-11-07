import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    accNo: "",
    regNo: "",
    amount: "",
    comment: "",
    company: "",
    category: "",
  });
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  // Hent brugerdata fra localStorage og backend
  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) return navigate("/");

    let storedUser;
    try {
      storedUser = JSON.parse(raw);
    } catch {
      console.error("Ugyldigt data i localStorage");
      return navigate("/");
    }

    const username = Array.isArray(storedUser)
      ? storedUser[0]?.username
      : storedUser?.username;

    if (!username) {
      console.error("Brugernavn mangler i localStorage");
      return navigate("/");
    }

    fetch(`http://localhost:3001/api/users?username=${username}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Kunne ikke hente brugerdata");
        return res.json();
      })
      .then((data) => {
        // Gem data som array for konsistens med andre sider
        const userArray = Array.isArray(data) ? data : [data];
        setUser(userArray[0]);
        localStorage.setItem("loggedInUser", JSON.stringify(userArray));
      })
      .catch((err) => {
        console.error("Fejl ved hentning af brugerdata:", err);
        navigate("/");
      });
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    let updatedFormData = { ...formData };

    // Find company info
    try {
      const res = await fetch(
        `http://localhost:3001/api/findCompany?regNo=${formData.regNo}&accNo=${formData.accNo}&comment=${encodeURIComponent(
          formData.comment
        )}`
      );
      if (res.ok) {
        const company = await res.json();
        updatedFormData.company = company?.name || "Ukendt";
        updatedFormData.category = company?.category || "Ukendt kategori";
      } else {
        updatedFormData.company = "Ukendt";
        updatedFormData.category = "Ukendt kategori";
      }
    } catch {
      updatedFormData.company = "Ukendt";
      updatedFormData.category = "Ukendt kategori";
    }

    // Send transaction til backend
    try {
      const res = await fetch(
        "http://localhost:3001/api/transactions/posttransactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: updatedFormData.company, // 🔹 send company med
            category: updatedFormData.category, // hvis du også vil gemme kategori
            senderRegNo: user.regNo,
            senderAccNo: user.accNo,
            receiverRegNo: formData.regNo,
            receiverAccNo: formData.accNo,
            amount: formData.amount,
            comment: formData.comment,
          }),
        }
      );

      const data = await res.json();
      setResponseData(data);

      // Opdater local user med transaktionen
      const updatedUser = { ...user };
      updatedUser.transactions = updatedUser.transactions || [];
      updatedUser.transactions.push({
        ...updatedFormData,
        timestamp: new Date().toISOString(),
      });

      setUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify([updatedUser]));
    } catch (error) {
      setResponseData({ error: "Noget gik galt med overførslen." });
    }
  };

  if (!user) return <p className="p-6 text-center">Indlæser bruger...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-slate-800 font-sans">
      <main className="flex flex-col flex-1 items-center text-center px-6 pt-28 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff] relative overflow-hidden">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#003366]">
            TrustBank Overførselssystem
          </h1>
          <p className="text-lg md:text-xl text-[#4a4a4a] mb-8">
            Din sikre vej til at overføre penge.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <fieldset className="flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label htmlFor="accNo" className="mb-1 font-medium">
                Modtagers kontonummer
              </label>
              <input
                type="number"
                id="accNo"
                value={formData.accNo}
                onChange={handleChange}
                placeholder="Kontonummer"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="regNo" className="mb-1 font-medium">
                Modtagers registeringsnummer
              </label>
              <input
                type="number"
                id="regNo"
                value={formData.regNo}
                onChange={handleChange}
                placeholder="Registreringsnummer"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="amount" className="mb-1 font-medium">
                Overførselsbeløb
              </label>
              <input
                type="number"
                id="amount"
                step=".01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Indtast beløb"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="comment" className="mb-1 font-medium">
                Kommentar
              </label>
              <input
                type="text"
                id="comment"
                value={formData.comment || ""}
                onChange={handleChange}
                placeholder="Kommentar / Beskrivelse"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button
              type="submit"
              className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition"
            >
              Overfør
            </button>
          </fieldset>
        </form>

        {responseData && (
          <div className="mt-10 bg-white p-4 rounded shadow max-w-md w-full text-left">
            <h2 className="text-xl font-bold mb-2">Respons:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}