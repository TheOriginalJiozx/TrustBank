import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Dropdown from "react-dropdown";
import DatePicker from "react-multi-date-picker";

export default function Transactions() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [userCards, setUserCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState([]);
  const [isDropdownSelected, setIsDropdownSelected] = useState(false);

  const monthParam = searchParams.get("month");
  const categoryParam = searchParams.get("category");
  const yearParam = searchParams.get("year");
  const cardNo = searchParams.get("card");

  const months = [
    "Januar", "Februar", "Marts", "April", "Maj", "Juni",
    "Juli", "August", "September", "Oktober", "November", "December"
  ];

  useEffect(() => {
    const raw = localStorage.getItem("loggedInUser");
    if (!raw) {
      navigate("/login");
      return;
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      console.error("Ugyldigt data i localStorage");
      navigate("/login");
      return;
    }

    const cards = Array.isArray(parsed) ? parsed : [parsed];
    setUserCards(cards);

    let initialCard = cards[0];
    if (cardNo) {
      const found = cards.find((c) => c.cardNo === cardNo);
      if (found) initialCard = found;
    }

    setSelectedCard(initialCard);
    setTransactions(initialCard?.transactions || []);

    fetch("http://localhost:3001/api/getCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, [navigate, cardNo]);

  useEffect(() => {
    if (monthParam) setSelectedMonth({ label: monthParam, value: monthParam });
    if (yearParam) setSelectedYear({ label: yearParam, value: yearParam });
    if (categoryParam) setSelectedCategory({ label: categoryParam, value: categoryParam });
  }, [monthParam, yearParam, categoryParam]);

  const Arrow = ({ className = "" }) => (
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
      alert("Vælg venligst et år først.");
      return;
    }
    setSelectedDate([]);
    setSelectedMonth(option);
    setIsDropdownSelected(true);
  };

  const handleYearSelect = (option) => {
    setSelectedDate([]);
    setSelectedYear(option);
    setIsDropdownSelected(true);
  };

  const handleCategorySelect = (option) => {
    setSelectedCategory(option);
    setIsDropdownSelected(true);
  };

  const handleDateSelect = (option) => {
    setSelectedMonth(null);
    setSelectedYear(null);
    setSelectedCategory(null);
    setSelectedDate(option);
    setIsDropdownSelected(false);
  };

  let displayedTransactions = transactions;
  if (selectedDate?.length >= 1) {
    const start = selectedDate[0];
    const end = selectedDate.length === 2 ? selectedDate[1] : selectedDate[0];

    const startDate = new Date(start.year, start.month.index, start.day, 0, 0, 0, 0);
    const endDate = new Date(end.year, end.month.index, end.day, 23, 59, 59, 999);

    displayedTransactions = displayedTransactions.filter((t) => {
      if (!t.timestamp) return false;
      const txDate = new Date(t.timestamp);
      return txDate >= startDate && txDate <= endDate;
    });
  } else {
    if (selectedYear) {
      displayedTransactions = displayedTransactions.filter((t) => {
        if (!t.timestamp) return false;
        return new Date(t.timestamp).getFullYear().toString() === selectedYear.label;
      });
    }
    if (selectedMonth) {
      displayedTransactions = displayedTransactions.filter((t) => {
        if (!t.timestamp) return false;
        const date = new Date(t.timestamp);
        return months[date.getMonth()] === selectedMonth.label;
      });
    }
    if (selectedCategory) {
      displayedTransactions = displayedTransactions.filter(
        (t) => t.category === selectedCategory.label
      );
    }
  }

  const monthOptions = months.map((m) => ({ label: m, value: m }));
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);
  const yearOptions = years.map((y) => ({ label: y.toString(), value: y.toString() }));
  const categoryOptions = Object.keys(categories).map((c) => ({ label: c, value: c }));

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366] mb-2">
        Dine transaktioner
      </h1>
      {selectedCard && (
        <p className="text-[#4a4a4a] mb-8">
          Kort: <span className="font-semibold">{selectedCard.cardNo}</span> — Reg{" "}
          {selectedCard.regNo}, Konto {selectedCard.accNo}
        </p>
      )}

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
              setTransactions(card.transactions || []);
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

      <div
        className={`flex gap-3 mb-4 items-center flex-wrap ${
          isDropdownSelected ? "flex-nowrap min-w-max" : ""
        }`}
      >
        <div className="flex gap-3 items-center relative">
          <Dropdown
            options={monthOptions}
            onChange={handleMonthSelect}
            value={selectedMonth}
            placeholder="Måned"
            disabled={!selectedYear}
            controlClassName={`py-2 px-4 rounded transition inline-flex items-center ${
              selectedYear
                ? "bg-[#003366] text-white hover:bg-[#002244] cursor-pointer"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            } min-h-[40px]`}
            menuClassName="absolute z-50 mt-1 bg-white text-black shadow-lg rounded min-w-[150px] max-h-64 overflow-y-auto"
            arrowClosed={<Arrow />}
            arrowOpen={<Arrow className="rotate-180" />}
          />

          <Dropdown
            options={yearOptions}
            onChange={handleYearSelect}
            value={selectedYear}
            placeholder="År"
            controlClassName="py-2 px-4 rounded transition inline-flex items-center bg-[#003366] text-white hover:bg-[#002244] cursor-pointer min-h-[40px]"
            menuClassName="absolute z-50 mt-1 bg-white text-black shadow-lg rounded min-w-[150px] max-h-64 overflow-y-auto"
            arrowClosed={<Arrow />}
            arrowOpen={<Arrow className="rotate-180" />}
          />

          <Dropdown
            options={categoryOptions}
            onChange={handleCategorySelect}
            value={selectedCategory || null}
            placeholder="Kategori"
            controlClassName="py-2 px-4 rounded transition inline-flex items-center bg-[#003366] text-white hover:bg-[#002244] cursor-pointer min-h-[40px]"
            menuClassName="absolute z-50 mt-1 bg-white text-black shadow-lg rounded min-w-[150px] max-h-64 overflow-y-auto"
            arrowClosed={<Arrow />}
            arrowOpen={<Arrow className="rotate-180" />}
          />
        </div>

        <div className="flex gap-2 items-center flex-shrink-0">
          <DatePicker
            value={selectedDate}
            onChange={handleDateSelect}
            range
            numberOfMonths={2}
            format="DD/MM/YYYY"
            placeholder="Vælg periode"
            inputClass="bg-white text-black py-2 px-4 rounded cursor-pointer text-center min-h-[40px] w-[220px]"
          />
          <button
            type="button"
            onClick={() => setSelectedDate([])}
            className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition min-h-[40px]"
          >
            Nulstil
          </button>
        </div>
      </div>

      {displayedTransactions.length > 0 ? (
        <ul className="space-y-3">
          {displayedTransactions.map((t, i) => (
            <li
              key={i}
              className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white"
            >
              {t.type === "sent" && (
                <>
                  <p>
                    <strong>FIK nummer:</strong> {t.fikNo}
                  </p>
                  <p>
                    <strong>Reference og kreditor nummer:</strong>{" "}
                    {t.receiverReferenceNo} / {t.receiverCreditorNo}
                  </p>
                  <p>
                    <strong>Modtager:</strong> {t.company || "Ukendt"}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {t.category || "Ukendt kategori"}
                  </p>
                </>
              )}

              {t.type === "received" && (
                <>
                  <p>
                    <strong>Afsender:</strong>{" "}
                    {t.username || selectedCard?.username || "Ukendt"}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {t.category || "Ukendt kategori"}
                  </p>
                </>
              )}

              <p>
                <strong>Beløb:</strong> {t.amount} kr.
              </p>
              <p>
                <strong>Status:</strong> {t.type}
              </p>
              <p>
                <strong>Kommentar:</strong> {t.comment || "Ingen kommentar"}
              </p>
              <p>
                <strong>Dato:</strong>{" "}
                {t.timestamp
                  ? new Date(t.timestamp).toLocaleString("da-DK")
                  : "Ukendt"}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 text-center">
          Ingen transaktioner for dette kort.
        </p>
      )}
    </main>
  );
}