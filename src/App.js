import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/header";
import Index from "./pages/home";
import Footer from "./components/footer";
import Login from "./pages/login";
import Me from "./pages/me";
import Post from "./pages/transaction/post"
import Transactions from './pages/transactions';

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
                    <Route path="/post" element={<Post />} />
                    <Route path="/transactions" element={<Transactions />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;