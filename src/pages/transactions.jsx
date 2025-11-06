import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!storedUser) {
      navigate('/login');
      return;
    }

    setUser(storedUser);

    const userKey = `transactions_${storedUser.username}`;
    const savedTransactions = JSON.parse(localStorage.getItem(userKey)) || [];
    setTransactions(savedTransactions);
  }, [navigate]);

  return (
     <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Oversigt over alle dine transaktioner
      </h1>

      {transactions.length > 0 ? (
        <ul className="space-y-3">
          {transactions.map((t, index) => (
            <li
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <strong>Reg og kontonummer:</strong> {t.regNo} / {t.accNo}
              </p>
              <p>
                <strong>Beløb:</strong> {t.amount} kr.
              </p>
              <p>
                <strong>Modtager:</strong> {t.company || t.customer || "Ukendt"}
              </p>
              <p>
                <strong>Kategori:</strong> {t.category || "Ukendt kategori"}
              </p>
              <p>
                <strong>Dato:</strong> {t.timestamp
                  ? new Date(t.timestamp).toLocaleString("da-DK")
                  : "Ukendt"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">
          Du har ingen gemte transaktioner endnu.
        </p>
      )}
    </main>
  );
}