import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/header";
import Index from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Me from "./pages/me";
import Account from "./pages/account";
import Transfer from "./pages/transaction/transfer";
import Transactions from './pages/transactions';
import Bservice from "./pages/bservice";
import Cardusage from "./pages/cardusage";

function App() {
    useEffect(() => {
        fetch("http://localhost:3000")
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/me" element={<Me />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/bservice" element={<Bservice />} />
                    <Route path="/cardusage" element={<Cardusage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;