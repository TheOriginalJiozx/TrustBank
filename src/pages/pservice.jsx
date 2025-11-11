import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dropdown from 'react-dropdown';

export default function PaymentService() {
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [errors, setErrors] = useState({ referenceNo: "", creditorNo: "" });
  const [loading, setLoading] = useState(true);

  const [form, formData] = useState({
    company: "",
    pbsNo: "",
    debGrNr: "",
    customerNo: "",
    amountMonthly: "",
    dayOfMonth: "",
    note: "",
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [serverResponse, setServerResponse] = useState(null);
  const [mandates, setMandates] = useState([]);
  const [loadingMandates, setLoadingMandates] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);

  const navigate = useNavigate();

  const apiBase = "http://localhost:3001/api";

  const loadMandates = async (accNo, regNo) => {
    setLoadingMandates(true);
    try {
      const res = await fetch(`${apiBase}/directdebits?accNo=${accNo}&regNo=${regNo}`);
      const data = await res.json();
      setMandates(Array.isArray(data) ? data : []);
    } catch {
      setMandates([]);
    } finally {
      setLoadingMandates(false);
    }
  };

  const reformData = () =>
    formData({ company: "", pbsNo: "", debGrNr: "", customerNo: "", amountMonthly: "", dayOfMonth: "", note: "" });

  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) {
      navigate("/login", { replace: true });
      setLoading(false);
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      setLoading(false);
      return;
    }
    const cards = Array.isArray(parsed) ? parsed : [parsed];
    setUserCards(cards);
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!selectedCard) return;
    loadMandates(selectedCard.accNo, selectedCard.regNo);
  }, [selectedCard]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    formData((p) => ({ ...p, [id]: value }));
  };

  const handlePBS = () => {
    let hasErrors = false;
    const newErrors = { pbsNo: "", debGrNr: "", customerNo: "" };

    if (!form.pbsNo || form.pbsNo.length !== 8) {
      newErrors.pbsNo = "PBS-nummer skal være 8 cifre";
      hasErrors = true;
    }

    if (!form.debGrNr || form.debGrNr.length < 5) {
      newErrors.debGrNr = "Debitor kredit nummer skal min være 5 cifre";
      hasErrors = true;
    }

    if (!form.customerNo || form.customerNo.length !== 9) {
      newErrors.customerNo = "Kundenummer skal være 9 cifre";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (!hasErrors) {
      setShowConfirmModal(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return alert("Vælg et kort først.");

    const payload = {
      username: selectedCard.username,
      regNo: selectedCard.regNo,
      accNo: selectedCard.accNo,
      pbsNo: String(form.pbsNo),
      debGrNr: String(form.debGrNr),
      customerNo: String(form.customerNo),
      amountMonthly: Number(form.amountMonthly),
      dayOfMonth: Number(form.dayOfMonth),
      note: form.note?.trim() || "",
    };

    try {
      setActionBusy(true);
      const res = await fetch(`${apiBase}/directdebits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      setServerResponse(res.ok ? data : { error: data?.error || "Kunne ikke oprette betalingsservice." });

      if (res.ok) {
        reformData();
        await loadMandates(selectedCard.accNo, selectedCard.regNo);
      }
    } catch {
      setServerResponse({ error: "Server utilgængelig eller netværksfejl." });
    } finally {
      setActionBusy(false);
    }
  };

  const handleCancel = async (mandateId) => {
    if (!selectedCard) return;
    try {
      setActionBusy(true);
      const res = await fetch(
        `${apiBase}/directdebits?id=${encodeURIComponent(mandateId)}&username=${encodeURIComponent(
          selectedCard.username
        )}`,
        { method: "DELETE" }
      );

      await loadMandates(selectedCard.accNo, selectedCard.regNo);
    } finally {
      setActionBusy(false);
    }
  };


  if (loading) return <p className="p-6 text-center">Indlæser...</p>;

  if (!selectedCard) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
        <section className="px-6 pt-28 pb-12 text-center bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff]">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366]">
            Betalingsservice
          </h1>
          <p className="mt-3 text-[#4a4a4a]">Vælg et kort til at tilknytte en ny Betalingsservice.</p>
        </section>

        <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
          {userCards.map((card) => (
            <div
              key={`${card.regNo}-${card.accNo}-${card.cardNo}`}
              onClick={() => setSelectedCard(card)}
              className="bg-white border border-gray-100 rounded-2xl p-8 shadow-md hover:shadow-lg transition cursor-pointer"
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
              Ny betalingsservice
            </h1>
            <p className="text-[#4a4a4a] mb-8">
              Kort: <span className="font-semibold">{selectedCard.cardNo}</span> — Reg {selectedCard.regNo}, Konto {selectedCard.accNo}
            </p>

            <div className="mb-6">
              <label className="block mb-1 font-medium text-left">Skift kort</label>
              <Dropdown
                options={userCards.map((card) => ({
                  value: card.cardNo,
                  label: `${card.cardNo} (Reg.nr.: ${card.regNo} - Kontonr.: ${card.accNo})`,
                }))}
                onChange={(e) => {
                  const card = userCards.find((c) => c.cardNo === e.value);
                  if (card) {
                    setSelectedCard(card);
                  }
                }}
                value={selectedCard ? selectedCard.cardNo : ""}
                placeholder="Vælg kort"
                className="w-full"
                controlClassName="w-full border border-gray-300 px-4 py-2 bg-white text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-none"
                menuClassName="mt-1 border border-gray-300 shadow-lg overflow-hidden z-10 bg-white menu-no-radius"
                optionClassName="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer rounded-none"
              />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="pbsNo" className="block mb-1 font-medium">PBS-nummer</label>
                <input
                  id="pbsNo"
                  type="text"
                  value={form.pbsNo}
                  onChange={handleChange}
                  maxLength={8}
                  placeholder="Fx 150"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                {errors.pbsNo && (
                  <p className="text-red-600 text-sm mt-1">{errors.pbsNo}</p>
                )}
              </div>

              <div>
                <label htmlFor="debGrNr" className="block mb-1 font-medium">Debitor gruppe nummer</label>
                <input
                  id="debGrNr"
                  type="text"
                  value={form.debGrNr}
                  onChange={handleChange}
                  minLength={5}
                  placeholder="Fx 150"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                {errors.debGrNr && (
                  <p className="text-red-600 text-sm mt-1">{errors.debGrNr}</p>
                )}
              </div>

              <div>
                <label htmlFor="customerNo" className="block mb-1 font-medium">Kundenummer</label>
                <input
                  id="customerNo"
                  type="text"
                  value={form.customerNo}
                  onChange={handleChange}
                  maxLength={9}
                  placeholder="Fx 150"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                {errors.customerNo && (
                  <p className="text-red-600 text-sm mt-1">{errors.customerNo}</p>
                )}
              </div>

              <div>
                <label htmlFor="amountMonthly" className="block mb-1 font-medium">Beløb</label>
                <input
                  id="amountMonthly"
                  type="text"
                  step=".01"
                  value={form.amountMonthly}
                  onChange={handleChange}
                  placeholder="Fx 150"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="dayOfMonth" className="block mb-1 font-medium">Trækningsdag (1–31)</label>
                <input
                  id="dayOfMonth"
                  type="number"
                  min="1"
                  max="31"
                  value={form.dayOfMonth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">1-31</p>
              </div>

              <div>
                <label htmlFor="note" className="block mb-1 font-medium">Notat (valgfri)</label>
                <input
                  id="note"
                  type="text"
                  value={form.note}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <button
                type="button"
                onClick={handlePBS}
                className={`bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition disabled:opacity-60 transition
                  }`}
              >
                {actionBusy ? "Opretter..." : "Opret betalingsservice"}
              </button>
            </form>

            {showConfirmModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 text-left">
                  <h2 className="text-xl font-bold mb-4 text-center">Bekræft PBS aftale</h2>
                  <p className="mb-4">Har du husket at dobbelttjekke dine indtastninger?</p>

                  <div className="mb-6 space-y-2">
                    <p><span className="font-semibold">PBS-nummer:</span> {form.pbsNo}</p>
                    <p><span className="font-semibold">Debitor gruppe nummer:</span> {form.debGrNr}</p>
                    <p><span className="font-semibold">Kundenummer:</span> {form.customerNo}</p>
                    <p><span className="font-semibold">Månedligt beløb:</span> {form.amountMonthly}</p>
                    <p><span className="font-semibold">Kommentar:</span> {form.note || "-"}</p>
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

            {serverResponse && (
              <div className="mt-8 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Respons</h2>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(serverResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[#003366] mb-4">Mine betalingsservices</h2>

            {loadingMandates ? (
              <p>Henter betalingsservices…</p>
            ) : mandates.length === 0 ? (
              <p className="text-[#666]">Ingen betalingsservices registreret for denne konto endnu.</p>
            ) : (
              <div className="grid gap-4">
                {mandates
                  .slice()
                  .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
                  .map((m) => (
                    <div
                      key={m.id}
                      className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">
                            {typeof m.company === "object" ? m.company.name : m.company || "Ukendt virksomhed"}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              m.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {m.active ? "Aktiv" : "Annulleret"}
                          </span>
                        </div>

                        <div className="text-xs text-[#888]">
                          {m.company?.category && <span className="mr-2">{m.company.category}</span>}
                          {m.amountMonthly && m.dayOfMonth && (
                            <span className="mr-2">
                              {m.amountMonthly} kr. den {m.dayOfMonth}. hver måned
                            </span>
                          )}
                          Oprettet {new Date(m.createdAt).toLocaleString("da-DK")}
                          {m.note ? ` • Notat: ${m.note}` : ""}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {m.active && (
                          <button
                            onClick={() => handleCancel(m.id)}
                            disabled={actionBusy}
                            className="px-3 py-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50 disabled:opacity-60"
                          >
                            Annuller
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}