import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";

export default function App() {
    return (
        <div id="body" className="h-screen w-screen bg-gray-100">
            <BrowserRouter>
                <Navbar />
                {/* Pages */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
