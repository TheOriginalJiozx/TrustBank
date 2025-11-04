import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.svg";

function Header() {
  const [user, setUser] = useState(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        servicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setServicesOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [servicesOpen]);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="w-full px-6 bg-white/20 backdrop-blur-md top-0 left-0 z-20 shadow-md flex justify-between items-center">
      <img src={logo} alt="TrustBank Logo" className="h-28" />

      <nav className="flex gap-6 items-center">
        <a href="#home" className="text-black-800 font-medium hover:text-black-600 transition">
          Hjem
        </a>


        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setServicesOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={servicesOpen}
            className="inline-flex items-center gap-2 text-black-800 font-medium hover:text-black-600 transition"
          >
            Services
            <svg
              className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
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
          </button>

          {servicesOpen && (
            <div
              ref={dropdownRef}
              role="menu"
              aria-label="Services"
              className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2"
            >

              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
                onClick={() => setServicesOpen(false)}
              >
                Konti & indskud
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
                onClick={() => setServicesOpen(false)}
              >
                Betalinger & overførsler
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
                onClick={() => setServicesOpen(false)}
              >
                Kort & forbrug
              </button>
              <button
                type="button"
                role="menuitem"
                className="w-full text-left px-3 py-2 rounded-xl hover:bg-gray-100"
                onClick={() => setServicesOpen(false)}
              >
                Lån & kredit
              </button>
            </div>
          )}
        </div>

        <a href="#contact" className="text-black-800 font-medium hover:text-black-600 transition">
          Kontakt
        </a>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold hover:text-red-800 transition"
          >
            Log ud ({user})
          </button>
        ) : (
          <a href="/login" className="text-green-600 font-semibold hover:text-green-800 transition">
            Log ind
          </a>
        )}
      </nav>
    </header>
  );
}

export default Header;