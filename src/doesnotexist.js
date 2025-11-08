import { useNavigate } from 'react-router-dom';

const DoesNotExist = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Siden Ikke Fundet</h1>
      <p>Siden du prøvede at tilgå findes ikke.</p>
      <button onClick={goHome}>Gå tilbage</button>
    </div>
  );
};

export default DoesNotExist;