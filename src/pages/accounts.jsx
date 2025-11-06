import { useEffect, useState } from "react";

export default function Accounts() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-slate-800">
      <section className="px-6 pt-28 pb-12 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#003366]">
            Konti & indskud
          </h1>
          <p className="mt-4 text-lg text-[#4a4a4a]">
            Oversigtsside for konti, indskud og opsparing.
          </p>
          {!user && (
            <a href="/login" className="inline-block mt-6">
              <button className="px-6 py-3 rounded-xl bg-[#003366] text-white font-semibold hover:bg-[#00264d] transition">
                Log ind for at se dine konti
              </button>
            </a>
          )}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#003366]">Lønkonto</h3>
          <p className="mt-2 text-sm text-[#555]">Pladsholder for saldo, bevægelser m.m.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#003366]">Opsparing</h3>
          <p className="mt-2 text-sm text-[#555]">Pladsholder for rente, mål og indskud.</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold text-[#003366]">Indlån & indskud</h3>
          <p className="mt-2 text-sm text-[#555]">Pladsholder for faste indskud m.m.</p>
        </div>
      </section>
    </div>
  );
}
