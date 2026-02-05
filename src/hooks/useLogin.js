import { useState } from "react";
import useAuthContext from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    async function login(email, password) {
        try {
            setIsLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                },
            );
            const json = await response.json();

            if (!response.ok) {
                console.log(json.error);

                setError(json.error);
                setIsLoading(false);
                return;
            }

            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });

            setError("");
            setIsLoading(false);

            navigate("/", { replace: true });
        } catch (error) {
            console.log(error);
            setError("Something went wrong...");
            setIsLoading(false);
        }
    }

    return {
        login,
        isLoading,
        error,
        setError,
    };
}
