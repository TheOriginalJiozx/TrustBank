import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem('loggedInUser');
    if (!raw) {
      navigate('/login', { replace: true }); // Redirect hvis ikke logget ind
      return;
    }
    setUserData(JSON.parse(raw));
  }, [navigate]);

  if (!userData) return <p>Indlæser brugerdata...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center pt-28 bg-gray-100 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Din konto</h1>
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <p><strong>Brugernavn:</strong> {userData.username}</p>
        <p><strong>Registreringsnummer:</strong> {userData.regNo}</p>
        <p><strong>Kontonummer:</strong> {userData.accNo}</p>
      </div>
    </div>
  );
}