import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { useSearchParams } from "react-router-dom";


export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const month = searchParams.get("month");
  const category = searchParams.get("category");



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

    fetch("http://localhost:3001/api/getCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch(() => {
        setCategories({});
    });


  }, [navigate]);

  const Arrow = ({ className = '' }) => (
  <svg
    className={`w-4 h-4 ${className}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
  );

  const handleMonthSelect = (option) => {
    setSelectedMonth(option);
    navigate(option.value);
  };

  const handleCategorySelect = (option) => {
    navigate(option.value);
  };

  const categoryNames = Object.keys(categories);

  const months = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
  ];

  const monthOptions = months.map((m) => ({
    label: m,
    value: `?month=${encodeURIComponent(m)}${category ? `&category=${encodeURIComponent(category)}` : ""}`
  }));

  const categoryOptions = categoryNames.map((c) => ({
    label: c,
    value: `?${month ? `month=${encodeURIComponent(month)}&` : ""}category=${encodeURIComponent(c)}`
  }));

  let displayedTransactions = selectedMonth
  ? transactions.filter((t) => {
      if (!t.timestamp) return false;
      const date = new Date(t.timestamp);
      const monthIndex = date.getMonth(); 
      return months[monthIndex] === month;
    })
  : transactions;

  if (category) {
    displayedTransactions = displayedTransactions.filter((t) => t.category === category);
  }

  return (
     <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Oversigt over alle dine transaktioner
      </h1>
      <div className="flex gap-3 mb-4">
        <Dropdown
          options={monthOptions}
          onChange={handleMonthSelect}
          value={selectedMonth}
          placeholder="Måned"
          controlClassName="
            bg-[#003366] text-white py-2 px-4 rounded 
            hover:bg-[#002244] transition
            inline-flex items-center
            "
          arrowClosed={<Arrow className="text-white-700" />}
          arrowOpen={<Arrow className="text-white-700 rotate-180" />}
          menuClassName="
            absolute mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50"
          placeholderClassName="font-medium text-white"
        >
        </Dropdown>
        <Dropdown
          options={categoryOptions}
          onChange={handleCategorySelect}
          value={category}
          placeholder="Kategori"
          controlClassName="
            bg-[#003366] text-white py-2 px-4 rounded 
            hover:bg-[#002244] transition
            inline-flex items-center
          "
          arrowClosed={<Arrow className="text-white" />}
          arrowOpen={<Arrow className="text-white rotate-180" />}
          menuClassName="
            absolute mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50
          "
          placeholderClassName="font-medium text-white"
        />
      </div>
      {displayedTransactions.length > 0 ? (
        <ul className="space-y-3">
          {displayedTransactions.map((t, index) => (
            <li
              key={index}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              <p>
                <strong>Beløb:</strong> {t.amount} kr.
              </p>
              <p>
                <strong>Modtager:</strong> {t.company}
              </p>
              <p>
                <strong>Kategori:</strong> {t.category}
              </p>
              <p>
                <strong>Dato:</strong> {" "}
                {t.timestamp
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