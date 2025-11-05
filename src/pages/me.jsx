import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Me() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('user');

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify({ username: user }));
      navigate('/', { replace: true });
    } else {
      navigate('/account');
    }
  }, [navigate]);

  return <p>Logger ind...</p>;
}