import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-dropdown';
import AlgorithmVisualizer from '../../components/AlgorithmVisualizer';

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
    referenceNo: "",
    creditorNo: "",
    fikNo: "",
    durationMs: "",
  });
  const [responseData, setResponseData] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ referenceNo: "", creditorNo: "" });
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

  const handlePayment = () => {
    let hasErrors = false;
    const newErrors = { referenceNo: "", creditorNo: "" };

    if (!formData.referenceNo || formData.referenceNo.length !== 15) {
      newErrors.referenceNo = "Reference nummer skal være 15 cifre";
      hasErrors = true;
    }

    if (!formData.creditorNo || formData.creditorNo.length !== 8) {
      newErrors.creditorNo = "Kreditor nummer skal være 8 cifre";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      setShowConfirmModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCard) return alert("Vælg et kort først!");

    let updatedFormData = { ...formData };

    try {
      const res = await fetch(
        `http://localhost:3001/api/findCompany?creditorNo=${formData.creditorNo}&referenceNo=${formData.referenceNo}&fikNo=${formData.fikNo}&comment=${encodeURIComponent(formData.comment)}`
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
            receiverCreditorNo: formData.creditorNo,
            receiverReferenceNo: formData.referenceNo,
            amount: formData.amount,
            comment: formData.comment,
            fikNo: formData.fikNo,
            duration: formData.durationMs,
          }),
        }
      );

      const data = await res.json();
      setResponseData(data);
    } catch (error) {
      console.error("Fejl ved betaling:", error);
      setResponseData({ error: "Noget gik galt med betalingen." });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Indlæser dine kortdata...</p>
      </div>
    );
  }

  const options = ["", "+71"];

  if (!selectedCard) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
        <section className="px-6 pt-28 pb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366]">
            Dine kort
          </h1>
          <p className="mt-4 text-lg text-[#4a4a4a]">
            Klik på et kort for at betale faktura.
          </p>
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
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-slate-800">
      <main className="flex-1 px-6 pt-28 pb-12 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff]">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366] mb-2">
              Betal faktura
            </h1>
            <p className="text-[#4a4a4a] mb-8">
              Kort: <span className="font-semibold">{selectedCard.cardNo}</span> — Reg {selectedCard.regNo}, Konto {selectedCard.accNo}
            </p>

            <div className="mb-6">
              <label className="block mb-1 font-medium text-left">Skift kort</label>
              <Dropdown
                options={userCards.map(card => ({
                  value: card.cardNo,
                  label: `${card.cardNo} (Reg.nr.: ${card.regNo} - Kontonr.: ${card.accNo})`,
                }))}
                onChange={(e) => {
                  const card = userCards.find(c => c.cardNo === e.value);
                  setSelectedCard(card);
                }}
                value={selectedCard ? selectedCard.cardNo : ""}
                placeholder="Vælg kort"
                className="w-full"
                controlClassName="w-full border border-gray-300 px-4 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
                menuClassName="mt-1 border border-gray-300 shadow-lg overflow-hidden z-10 bg-white menu-no-radius"
                optionClassName="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-none"
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Dropdown
                options={options}
                onChange={(e) => setFormData({ ...formData, fikNo: e.value })}
                value={formData.fikNo}
                placeholder="Vælg FIK-nummer"
                className="w-full"
                controlClassName="w-full border border-gray-300 px-4 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
                menuClassName="mt-1 border border-gray-300 shadow-lg overflow-hidden z-10 bg-white menu-no-radius"
                optionClassName="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-none"
              />

              <div className="flex flex-col text-left">
                <label htmlFor="referenceNo" className="mb-1 font-medium">
                  Modtagers reference nummer
                </label>
                <input
                  type="text"
                  id="referenceNo"
                  value={formData.referenceNo}
                  onChange={handleChange}
                  placeholder="Reference nummer"
                  maxLength={15}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.referenceNo && (
                  <p className="text-red-600 text-sm mt-1">{errors.referenceNo}</p>
                )}
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="creditorNo" className="mb-1 font-medium">
                  Modtagers kreditor nummer
                </label>
                <input
                  type="text"
                  id="creditorNo"
                  value={formData.creditorNo}
                  onChange={handleChange}
                  placeholder="Kreditor nummer"
                  maxLength={8}
                  className="border border-gray-300 rounded px-3 py-2"
                />
                {errors.creditorNo && (
                  <p className="text-red-600 text-sm mt-1">{errors.creditorNo}</p>
                )}
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="amount" className="mb-1 font-medium">
                  Skyldte beløb
                </label>
                <input
                  type="number"
                  id="amount"
                  step=".01"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Indtast beløb"
                  onKeyDown={(e) => {
                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  }}
                  className="border border-gray-300 rounded px-3 py-2 appearance-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
                type="button"
                onClick={handlePayment}
                className={`py-2 px-4 rounded transition ${formData.fikNo
                    ? "bg-[#003366] text-white hover:bg-[#002244]"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
              >
                Betal faktura
              </button>
            </form>

            {showConfirmModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-left">
                  <h2 className="text-xl font-bold mb-4 text-center">Bekræft betaling</h2>
                  <p className="mb-4">Har du husket at dobbelttjekke dine indtastninger?</p>

                  <div className="mb-6 space-y-2">
                    <p><span className="font-semibold">FIK-nummer:</span> {formData.fikNo}</p>
                    <p><span className="font-semibold">Reference nummer:</span> {formData.referenceNo}</p>
                    <p><span className="font-semibold">Kreditor nummer:</span> {formData.creditorNo}</p>
                    <p><span className="font-semibold">Beløb:</span> {formData.amount}</p>
                    <p><span className="font-semibold">Kommentar:</span> {formData.comment || "-"}</p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setShowConfirmModal(false);
                        handleSubmit(new Event("submit"));
                      }}
                      className="bg-[#003366] text-white px-4 py-2 rounded hover:bg-[#002244] transition"
                    >
                      Ja, fortsæt
                    </button>
                    <button
                      onClick={() => setShowConfirmModal(false)}
                      className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                    >
                      Annuller
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6" />

            <AlgorithmVisualizer
                creditorNo={formData.creditorNo}
                referenceNo={formData.referenceNo}
                fikNo={formData.fikNo}
                comment={formData.comment}
            />

            {responseData && (
              <div className="mt-10 bg-white p-4 rounded shadow w-full text-left">
                <h2 className="text-xl font-bold mb-2">Respons:</h2>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </main>
      <br />
    </div>
  );
}