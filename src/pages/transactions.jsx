import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import { useSearchParams } from "react-router-dom";
import DatePicker, { DateObject } from 'react-multi-date-picker';


export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState([
    new DateObject().setDay(15),
    new DateObject().add(1, "month").setDay(15)
  ]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const month = searchParams.get("month");
  const category = searchParams.get("category");
  const year = searchParams.get("year");



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
  if (!selectedYear) {
    alert("Vælg venligst et år før du vælger en måned.");
    return;
  }
    setSelectedDate(null);
    setSelectedMonth(option);

  const newParams = new URLSearchParams(searchParams);
  newParams.set("month", option.label);
  newParams.set("year", selectedYear.label);
  navigate(`?${newParams.toString()}`);
  };

  const handleCategorySelect = (option) => {
    navigate(option.value);
  };

  const handleYearSelect = (option) => {
    setSelectedDate(null)
    setSelectedYear(option);
    navigate(option.value);
  };

  
  const handleDateSelect = (option) => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedDate(option);
    navigate("/transactions");
    
  };

  const categoryNames = Object.keys(categories);

  const months = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
  ];

  const monthOptions = months.map((m) => ({
    label: m,
    value: `?month=${encodeURIComponent(m)}${year ? `&year=${encodeURIComponent(year)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const yearOptions = years.map((y) => ({
    label: y.toString(),
    value: `?year=${encodeURIComponent(y)}${month ? `&month=${encodeURIComponent(month)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`
  }));


  const categoryOptions = categoryNames.map((c) => ({
    label: c,
    value: `?${month ? `month=${encodeURIComponent(month)}&` : ""}${year ? `year=${encodeURIComponent(year)}&` : ""}category=${encodeURIComponent(c)}`
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

  if (year) {
    displayedTransactions = displayedTransactions.filter((t) => {
      if (!t.timestamp) return false;
      const date = new Date(t.timestamp);
      return date.getFullYear().toString() === year;
    });
  }

  if (selectedDate?.length === 2) {
  const [start, end] = selectedDate;
  displayedTransactions = displayedTransactions.filter((t) => {
    if (!t.timestamp) return false;
    const txDate = new Date(t.timestamp);
    return txDate >= start.toDate() && txDate <= end.toDate();
  });
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
          disabled={!selectedYear} // disable interaction
          controlClassName={`${
            selectedYear
              ? "bg-[#003366] text-white hover:bg-[#002244] cursor-pointer"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          } py-2 px-4 rounded transition inline-flex items-center`}
          arrowClosed={<Arrow className="text-white-700" />}
          arrowOpen={<Arrow className="text-white-700 rotate-180" />}
          menuClassName="
            absolute mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50"
          placeholderClassName="font-medium text-white"
        />
        <Dropdown
          options={yearOptions}
          onChange={handleYearSelect}
          value={selectedYear}
          placeholder="År"
          controlClassName="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition inline-flex items-center"
          arrowClosed={<Arrow className="text-white" />}
          arrowOpen={<Arrow className="text-white rotate-180" />}
          menuClassName="absolute mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50"
          placeholderClassName="font-medium text-white"
        />
        <Dropdown
          options={categoryOptions}
          onChange={handleCategorySelect}
          value={category}
          placeholder="Kategori"
          controlClassName="
            bg-[#003366] text-white py-2 px-4 rounded min-w-max
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
        <div className='flex gap-1'>
        <DatePicker
            value={selectedDate}
            onChange={handleDateSelect}
            range
            numberOfMonths={2}
            format="DD/MM/YYYY"
            inputClass="bg-[white] text-black py-2 px-4 rounded hover: transition cursor-pointer text-center"
        />
        <button
          type="button"
          onClick={() => setSelectedDate([])}
          className="bg-[#003366] text-white py-2 px-4 rounded min-w-max 
            hover:bg-[#002244] transition
            inline-flex items-center"
        >
          Nulstil dato
        </button>
        </div>
      </div>
      {displayedTransactions.length > 0 ? (
        <ul className="space-y-3">
          {displayedTransactions.map((t, index) => (
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