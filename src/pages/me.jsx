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
        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('loggedInUser', JSON.stringify(data));
          window.dispatchEvent(new Event('storage'));
          navigate('/account', { replace: true });
          return;
        }

        const errorData = await res.json().catch(() => ({}));
        if (res.status === 404 || (errorData.message && errorData.message.includes('findes ikke'))) {
          console.warn('Bruger findes ikke — opretter ny bruger...');
          return fetch('http://localhost:3001/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: urlUser }),
          });
        }

        throw new Error(errorData.message || 'Uventet fejl ved brugeropslag');
      })
      .then(async res => {
        if (!res) return;
        if (!res.ok) throw new Error('Kunne ikke oprette bruger');

        const newUser = await res.json();
        localStorage.setItem('loggedInUser', JSON.stringify(newUser));
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