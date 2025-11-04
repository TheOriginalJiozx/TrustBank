import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="w-full px-6 bg-white/20 backdrop-blur-md top-0 left-0 z-20 shadow-md flex justify-between items-center">
      <img src={logo} alt="TrustBank Logo" className="h-28" />

      <nav className="flex gap-6">
        <a href="#home" className="text-black-800 font-medium hover:text-black-600 transition">Hjem</a>
        <a href="#services" className="text-black-800 font-medium hover:text-black-600 transition">Services</a>
        <a href="#contact" className="text-black-800 font-medium hover:text-black-600 transition">Kontakt</a>

        {user ? (
          <button onClick={handleLogout} className="text-red-600 font-semibold hover:text-red-800 transition">
            Log ud {'loggedInUser'}
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