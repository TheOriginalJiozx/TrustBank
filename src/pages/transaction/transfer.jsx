import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [formData, setFormData] = useState({
    accNo: "",
    regNo: "",
    amount: "",
    comment: "",
    company: "",
    category: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) {
      navigate('/login', { replace: true });
      setLoading(false);
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("Ugyldigt data i localStorage");
      setLoading(false);
      return;
    }

    const cards = Array.isArray(parsed) ? parsed : [parsed];
    setUserCards(cards);
    setLoading(false);
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return alert("Vælg et kort først!");

    let updatedFormData = { ...formData };

    try {
      const res = await fetch(
        `http://localhost:3001/api/findCompany?regNo=${formData.regNo}&accNo=${formData.accNo}&comment=${encodeURIComponent(formData.comment)}`
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

    try {
      const res = await fetch(
        "http://localhost:3001/api/transactions/posttransactions",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            company: updatedFormData.company,
            category: updatedFormData.category,
            senderUsername: selectedCard.username,
            senderRegNo: selectedCard.regNo,
            senderAccNo: selectedCard.accNo,
            receiverRegNo: formData.regNo,
            receiverAccNo: formData.accNo,
            amount: formData.amount,
            comment: formData.comment,
          }),
        }
      );

      const data = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error("Fejl ved overførsel:", error);
      setResponseData({ error: "Noget gik galt med overførslen." });
    }
  };

  if (loading) return <p className="p-6 text-center">Indlæser kort...</p>;

  if (!selectedCard) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
        <section className="px-6 pt-28 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366]">
            Vælg et kort
          </h1>
        </section>
        <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
          {userCards.map((card) => (
            <div
              key={card.cardNo}
              onClick={() => handleCardSelect(card)}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition cursor-pointer w-full"
            >
              <div className="relative bg-gradient-to-r from-[#003366] to-[#0066cc] text-white rounded-xl p-6 mb-6 shadow-inner">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-lg">TRUSTBANK</span>
                  <img src="../../chip.png" alt="Chip" className="w-10 h-8 opacity-80" />
                </div>
                <p className="tracking-widest text-xl font-mono">{card.cardNo}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <p className="text-xs opacity-70">NAVN</p>
                    <p className="font-semibold">{card.username}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-70">CVV</p>
                    <p className="font-semibold">{card.cvv}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#003366] mb-2">Kortoplysninger</h3>
                <p className="text-sm text-[#555]">Reg.nr.: {card.regNo}</p>
                <p className="text-sm text-[#555]">Konto: {card.accNo}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-slate-800 font-sans">
      <main className="flex flex-col flex-1 items-center text-center px-6 pt-28 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff] relative overflow-hidden">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#003366]">
          Overfør fra kort: {selectedCard.cardNo}
        </h1>

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