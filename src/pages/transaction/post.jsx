import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [responseData, setResponseData] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    accNo: "",
    regNo: "",
    amount: "",
    category: "",
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (!storedUser) {
      navigate('/');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedFormData = { ...formData };

    try {
      const res = await fetch(
          `http://localhost:3001/api/findCompany?regNo=${formData.regNo}&accNo=${formData.accNo}`
      );

    if (res.ok) {
          const company = await res.json();
          if (company) {
            updatedFormData.company = company.name;
            updatedFormData.category = company.category;
          } else {
            updatedFormData.company = "Ukendt";
          }
        }
      } catch(err) {
          console.log("Virksomheden findes ikke", err);
      }

    try {
      const res = await fetch("http://localhost:3001/api/transactions/posttransactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormData),
      });

      const data = await res.json();
      setResponseData(data);
    } catch (error) {
      setResponseData({ error: "Noget gik galt med overførslen." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-slate-800 font-sans">
      <main className="flex flex-col flex-1 items-center text-center px-6 pt-28 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff] relative overflow-hidden">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#003366]">
            Velkommen til TrustBank Overførselssystem
          </h1>
          <p className="text-lg md:text-xl text-[#4a4a4a] mb-8">
            Din sikre vej til at overføre penge.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
          <fieldset className="flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label htmlFor="accNo" className="mb-1 font-medium">
                Virksomhedens kontonummer
              </label>
              <input
                type="number"
                id="accNo"
                value={formData.accNo}
                onChange={handleChange}
                placeholder="Virksomhedens kontonummer"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="regNo" className="mb-1 font-medium">
                Virksomhedens registeringsnummer
              </label>
              <input
                type="number"
                id="regNo"
                value={formData.regNo}
                onChange={handleChange}
                placeholder="Virksomhedens registreringsnummer"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col text-left">
              <label htmlFor="amount" className="mb-1 font-medium">
                Overførselsbeløb
              </label>
              <input
                type="number"
                id="amount"
                step=".01"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Indtast beløb"
                className="border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <button type="submit" className="bg-[#003366] text-white py-2 px-4 rounded hover:bg-[#002244] transition">
              Overfør
            </button>

            <br />
          </fieldset>
        </form>

        {responseData && (
          <div className="mt-10 bg-white p-4 rounded shadow max-w-md w-full text-left">
            <h2 className="text-xl font-bold mb-2">Respons:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(responseData, null, 2)}
            </pre>
          </div>
        )}

        <div className="absolute top-[-80px] left-[-40px] w-72 h-72 bg-[#d0e9ff]/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 bg-[#ffd6e0]/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[70%] w-60 h-60 bg-[#e0f7ff]/40 rounded-full blur-xl animate-pulse"></div>
      </main>
    </div>
  );
}

export default Post;