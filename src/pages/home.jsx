import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

function ServiceCard({ title, text }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
      <h4 className="text-xl font-semibold mb-3 text-[#003366]">{title}</h4>
      <p className="text-[#444]">{text}</p>
    </div>
  );
}

function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const storedUser = localStorage.getItem('loggedInUser');
      if (storedUser) {
        setUser(storedUser);
      }
    }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb] text-slate-800 font-sans">

      <main className="flex flex-col flex-1 items-center text-center px-6 pt-28 bg-gradient-to-br from-[#eaf4ff] via-[#f8f9fb] to-[#ffffff] relative overflow-hidden">
        <div className="max-w-4xl z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#003366]">
            Velkommen til TrustBank
          </h1>
          <p className="text-lg md:text-xl text-[#4a4a4a] mb-8">
            Din sikre og gennemsigtige partner i økonomisk tryghed og fremtidig vækst.
          </p>

          <div className="flex gap-6 flex-wrap justify-center mb-12">
            {!user && (
              <a href="/login">
                <button class="px-8 py-3 rounded-xl bg-[#003366] text-white font-semibold shadow-md hover:bg-[#00264d] transition-all duration-300">
                  Log ind
                </button>
              </a>
            )}
          </div>
        </div>

        <div className="absolute top-[-80px] left-[-40px] w-72 h-72 bg-[#d0e9ff]/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 bg-[#ffd6e0]/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[40%] left-[70%] w-60 h-60 bg-[#e0f7ff]/40 rounded-full blur-xl animate-pulse"></div>
      </main>

      <section className="max-w-5xl mx-auto text-center px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#003366]">
          Hvad er TrustBank?
        </h2>
        <p className="text-[#555] max-w-3xl mx-auto text-lg md:text-xl mb-10">
          TrustBank anvender intelligente algoritmer til automatisk at kategorisere og strukturere dine transaktioner, hvilket giver dig et klart, trygt og professionelt overblik over din økonomi.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
            <p className="text-lg">
              <strong>Brugervenlig:</strong> Enkel og intuitiv grænseflade – så du altid har styr på din økonomi uden besvær.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
            <p className="text-lg">
              <strong>Sikkerhed i top:</strong> Dine data er krypteret og beskyttet med den nyeste teknologi.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
            <p className="text-lg">
              <strong>Automatisk budgettering:</strong> Få overblik over forbrug og opsparing uden manuel registrering.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle className="text-green-600 w-6 h-6 mt-1" />
            <p className="text-lg">
              <strong>Bæredygtig bank:</strong> Vi investerer ansvarligt – med omtanke for både dig og planeten.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f0f4f8] py-20 px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003366] mb-12">
          Vores kerneydelser
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <ServiceCard
            title="Personlig rådgivning"
            text="Få skræddersyede løsninger til din økonomi – uanset om du skal spare op, låne eller investere."
          />
          <ServiceCard
            title="Digital bank i topklasse"
            text="Administrér alt fra mobil eller computer med vores sikre og intuitive netbank."
          />
          <ServiceCard
            title="Fremtidssikret investering"
            text="Invester bæredygtigt og ansvarligt gennem vores rådgivere og automatiske porteføljer."
          />
        </div>
      </section>

      <section className="bg-[#003366] text-white py-16 text-center">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">Tillid fra tusindvis af danskere</h3>
        <p className="max-w-2xl mx-auto text-lg mb-8">
          Over 50.000 kunder har valgt TrustBank for vores gennemsigtighed, sikkerhed og personlige rådgivning.
        </p>
        <button className="px-8 py-3 bg-white text-[#003366] rounded-xl font-semibold hover:bg-[#e6e6e6] transition-all">
          Udforsk i dag
        </button>
      </section>

    </div>
  );
}

export default Home;