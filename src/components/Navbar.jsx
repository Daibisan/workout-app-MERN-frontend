import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuthContext from "../hooks/useAuthContext";

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    const logoutHandler = () => {
        logout();
    };

    return (
        <header className="sticky top-0 flex w-full items-center justify-between bg-white px-20 py-8">
            <h1 className="text-2xl font-bold py-2">
                <Link to="/">Workout Buddy</Link>
            </h1>
            <nav>
                {user && (
                    <div className="flex items-center gap-4">
                        <span>{user.email}</span>
                        <button
                            className="w-fit cursor-pointer rounded-sm border-2 border-green-600 px-2 py-1 text-green-600 hover:bg-green-600 hover:text-white"
                            onClick={logoutHandler}
                        >
                            Log out
                        </button>
                    </div>
                )}

                {!user && (
                    <div className="flex gap-4">
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                )}
            </nav>
        </header>
    );
}
