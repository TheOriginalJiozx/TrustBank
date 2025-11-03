import { useEffect, useState } from 'react';
import LoginButton from '../components/LoginButton';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      navigate('/profile');
    }
  }, [navigate]);

  return (
    <main className="flex flex-col items-center mt-20">
      <h1 className="mb-4 text-xl font-semibold text-center">
        Log ind på TrustBank og gør nytte af fremtidens bank
      </h1>
      <LoginButton />
    </main>
  );
}