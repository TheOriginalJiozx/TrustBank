import Header from './header.js';
import Footer from './footer.js';
import { CheckCircle } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#d0f1ff] via-[#f0eaff] to-[#ffe5ec] text-slate-800 font-sans relative overflow-hidden">
      <Header />

      <main className="flex flex-col flex-1 items-center justify-center text-center px-6 pt-28 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight text-[#3b3b3b]">
          Velkommen til TrustBank
        </h1>

        <p className="text-lg md:text-xl text-[#5a5a5a] mb-10 max-w-2xl">
          Din sikre, rolige og fremtidsorienterede bankoplevelse.
        </p>

        <div className="flex gap-6 flex-wrap justify-center mb-12">
          <button className="px-8 py-3 rounded-xl bg-[#a3d5ff] text-[#003366] font-semibold shadow-md hover:bg-[#91c8f0] transition-all duration-300">
            Log ind
          </button>
          <button className="px-8 py-3 rounded-xl bg-[#ffd6e0] text-[#660033] font-semibold shadow-md hover:bg-[#f0c2d0] transition-all duration-300">
            Opret konto
          </button>
        </div>

        <h3 className="text-3xl md:text-4xl font-bold mb-6 text-[#3b3b3b]">
          Hvad er TrustBank?
        </h3>

        <p className="text-[#5a5a5a] max-w-3xl text-lg md:text-xl mb-10">
          TrustBank anvender intelligente algoritmer til automatisk at kategorisere og strukturere dine transaktioner, hvilket giver dig et klart, trygt og professionelt overblik over din økonomi.
        </p>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl text-left">
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

        <div className="mt-16 text-lg md:text-xl text-[#444] italic">
          “TrustBank – fordi økonomisk tryghed starter med tillid.”
        </div>
      </main>

      <Footer />

      <div className="absolute top-[-80px] left-[-40px] w-72 h-72 bg-[#ffffff]/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-60px] w-96 h-96 bg-[#ffe5ec]/40 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-[40%] left-[70%] w-60 h-60 bg-[#d0f1ff]/40 rounded-full blur-xl animate-pulse"></div>
    </div>
  );
}

export default App;