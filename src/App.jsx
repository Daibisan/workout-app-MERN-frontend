import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import useAuthContext from "./hooks/useAuthContext";

export default function App() {
    const {user} = useAuthContext();

    return (
        <div id="body" className="h-screen w-screen bg-gray-100">
            <BrowserRouter>
                <Navbar />
                {/* Pages */}
                <Routes>
                    <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to={"/"} replace/>} />
                    <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} replace/>} />

                    <Route path="/" element={user ? <HomePage /> : <Navigate to={"/login"} replace/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
