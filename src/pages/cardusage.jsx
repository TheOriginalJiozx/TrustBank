import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cardusage() {
  const [userCards, setUserCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");

    if (!raw) {
      setLoading(false);
      navigate('/login', { replace: true });
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

  const handleCardClick = (card) => {
    navigate(`/transactions?card=${card.cardNo}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        <p>Indlæser dine kortdata...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
      <section className="px-6 pt-28 pb-12 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366]">
            Dine kort
          </h1>
          <p className="mt-4 text-lg text-[#4a4a4a]">
            Klik på et kort for at se dine transaktioner
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-6">
        {userCards.map((card) => (
          <div
            key={card.cardNo}
            onClick={() => handleCardClick(card)}
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