import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import Dropdown from 'react-dropdown';

function Header() {
  const [user, setUser] = useState(null);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('loggedInUser');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
    window.dispatchEvent(new Event('storage'));
  };

  const options = [
    { label: 'Kort & forbrug', value: '/cardusage' },
    { label: 'Betal faktura', value: '/payment' },
    { label: 'Betalingsservice', value: '/bservice' },
    { label: 'Lån & kredit', value: '/loans' },
  ];

  const handleSelect = (option) => {
    setSelected(option);
    navigate(option.value);
  };

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

  return (
    <header className="w-full px-6 bg-white/20 backdrop-blur-md top-0 left-0 z-20 shadow-md flex justify-between items-center h-28">
      <img src={logo} alt="TrustBank Logo" className="h-full" />

      <nav className="flex items-center gap-6">
        <a
          href="/"
          className="text-black-800 font-medium hover:text-black-600 transition h-full flex items-center"
        >
          Hjem
        </a>

        <Dropdown
          options={options}
          onChange={handleSelect}
          value={selected}
          placeholder="Services"
          controlClassName="
            inline-flex items-center text-black-800 font-medium
            hover:text-black-600 transition cursor-pointer bg-transparent border-none shadow-none h-full relative"
          arrowClosed={<Arrow className="text-gray-700" />}
          arrowOpen={<Arrow className="text-gray-700 rotate-180" />}
          menuClassName="
            absolute mt-2 w-56 rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-2 z-50"
          placeholderClassName="font-medium text-black"
        />

        <a href="/contact" className="text-black-800 font-medium hover:text-black-600 transition h-full flex items-center">
          Kontakt
        </a>

        {user ? (
          <button
            onClick={handleLogout}
            className="text-red-600 font-semibold hover:text-red-800 transition h-full flex items-center"
          >
            Log ud
          </button>
        ) : (
          <a href="/login" className="text-green-600 font-semibold hover:text-green-800 transition h-full flex items-center">
            Log ind
          </a>
        )}
      </nav>
    </header>
  );
}

export default Header;