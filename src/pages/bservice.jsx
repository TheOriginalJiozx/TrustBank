import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Bservice() {
  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    company: "",
    amountMonthly: "",
    dayOfMonth: "",
    endDate: "",
    note: "",
  });

  const [serverResponse, setServerResponse] = useState(null);
  const [mandates, setMandates] = useState([]);
  const [loadingMandates, setLoadingMandates] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);

  const navigate = useNavigate();


  const apiBase = "http://localhost:3001/api";

  const loadMandates = async (regNo, accNo) => {
    setLoadingMandates(true);
    try {
      const res = await fetch(`${apiBase}/directdebits?regNo=${regNo}&accNo=${accNo}`);
      const data = await res.json();
      setMandates(Array.isArray(data) ? data : []);
    } catch {
      setMandates([]);
    } finally {
      setLoadingMandates(false);
    }
  };

  const resetForm = () =>
    setForm({ company: "", amountMonthly: "", dayOfMonth: "", endDate: "", note: "" });


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
    loadMandates(selectedCard.regNo, selectedCard.accNo);
  }, [selectedCard]);


  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((p) => ({ ...p, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCard) return alert("Vælg et kort først.");

    const payload = {
      username: selectedCard.username,
      regNo: selectedCard.regNo,
      accNo: selectedCard.accNo,
      company: form.company.trim(),
      amountMonthly: Number(form.amountMonthly),
      dayOfMonth: Number(form.dayOfMonth),
      endDate: form.endDate || null,
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
        resetForm();
        await loadMandates(selectedCard.regNo, selectedCard.accNo);
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

      await loadMandates(selectedCard.regNo, selectedCard.accNo);
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

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="company" className="block mb-1 font-medium">Virksomhed</label>
                <input
                  id="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Fx. YouSee"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="amountMonthly" className="block mb-1 font-medium">Beløb</label>
                <input
                  id="amountMonthly"
                  type="number"
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
                <label htmlFor="endDate" className="block mb-1 font-medium">Slutdato (valgfri)</label>
                <input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
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
                type="submit"
                disabled={actionBusy}
                className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition disabled:opacity-60"
              >
                {actionBusy ? "Opretter..." : "Opret betalingsservice"}
              </button>
            </form>

            {serverResponse && (
              <div className="mt-8 bg-white p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Respons</h2>
                <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
                  {JSON.stringify(serverResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* ---- Existing mandates list ---- */}
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
                          <span className="text-lg font-semibold">{m.company}</span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              m.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {m.active ? "Aktiv" : "Annulleret"}
                          </span>
                        </div>
                        <div className="text-sm text-[#555]">
                          {Number(m.amountMonthly).toLocaleString("da-DK")} kr / md • d.{m.dayOfMonth}
                          {m.endDate ? ` • slutter ${m.endDate}` : ""}
                        </div>
                        <div className="text-xs text-[#888]">
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
