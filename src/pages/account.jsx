import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [userCards, setUserCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('loggedInUser');
    if (!raw) {
      navigate('/login', { replace: true });
      return;
    }

    try {
      const cards = JSON.parse(raw);
      if (Array.isArray(cards)) {
        setUserCards(cards);
      } else {
        console.warn('loggedInUser er ikke et array. Wrapping i array...');
        setUserCards([cards]);
      }
    } catch (err) {
      console.error('Kunne ikke parse loggedInUser fra localStorage', err);
      setUserCards([]);
    }
  }, [navigate]);

  if (userCards.length === 0) return <p>Indlæser brugerdata...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-28 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Din konto</h1>
      {userCards.map((card) => (
        <div key={card.cardNo} className="bg-white p-6 rounded shadow-md w-80 text-center mb-6">
          <p><strong>Brugernavn:</strong> {card.username}</p>
          <p><strong>Registreringsnummer:</strong> {card.regNo}</p>
          <p><strong>Kontonummer:</strong> {card.accNo}</p>
          <p><strong>Kortnummer:</strong> {card.cardNo}</p>
          <p><strong>CVV:</strong> {card.cvv}</p>
        </div>
      ))}
    </div>
  );
}