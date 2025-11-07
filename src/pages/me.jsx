import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Me() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlUser = params.get('user');

    const raw = localStorage.getItem('loggedInUser');
    const loggedUser = raw ? JSON.parse(raw).username : null;

    if (!urlUser || urlUser.trim() === '') {
      navigate('/login', { replace: true });
      return;
    }

    if (loggedUser && loggedUser !== urlUser) {
      navigate('/login', { replace: true });
      return;
    }

    if (loggedUser && loggedUser === urlUser) {
      navigate('/account', { replace: true });
      return;
    }

    fetch(`http://localhost:3001/api/users?username=${urlUser}`)
      .then(async res => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Bruger findes ikke');
        }
        return res.json();
      })
      .then(data => {
        localStorage.setItem('loggedInUser', JSON.stringify(data));
        window.dispatchEvent(new Event('storage'));
        navigate('/account', { replace: true });
      })
      .catch(err => {
        console.error('Fejl ved backend-kald:', err.message);
        navigate('/login', { replace: true });
      });
  }, [navigate]);

  return <p>Logger ind...</p>;
}