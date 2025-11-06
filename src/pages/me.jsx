import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Me() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');

    if (!user || user.trim() === '') {
      navigate('/login'); // redirect til login hvis user mangler
      return;
    }

    // POST til backend på port 3001
    fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user }),
    })
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Fejl fra server');
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        window.dispatchEvent(new Event('storage')); // trigger Header re-render
        navigate('/account', { replace: true }); // 🚀 her ændrer vi destinationen til /account
      })
      .catch(err => {
        console.error('Fejl ved backend-kald:', err.message);
        navigate('/login'); // fallback hvis noget går galt
      });
  }, [navigate]);

  return <p>Logger ind...</p>;
}