import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { error, isLoading, login } = useLogin();

    async function submitHandler(e) {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className="mx-auto mt-9 max-w-[35%] rounded-lg bg-white p-4 pb-6">
            <h2 className="mb-4">
                <strong>Log in</strong>
            </h2>
            <form onSubmit={submitHandler}>
                <ul className="text-sm">
                    <li className="mb-4 flex flex-col gap-2">
                        <label htmlFor="email_input">Log in:</label>
                        <input
                            className="w-full rounded-sm border border-gray-300 bg-white px-2 py-1"
                            type="email"
                            id="email_input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            required
                        />
                    </li>
                    <li className="mb-4 flex flex-col gap-2">
                        <label htmlFor="password_input">password:</label>
                        <input
                            className="w-full rounded-sm border border-gray-300 bg-white px-2 py-1"
                            type="password"
                            id="password_input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            required
                            autoComplete="false"
                        />
                    </li>
                </ul>

                <button
                    type="submit"
                    className={`rounded-sm bg-green-600 p-2 text-sm text-white ${!isLoading ? "cursor-pointer" : "text-white/50"}`}
                    disabled={isLoading}
                >
                    Log in
                </button>
            </form>
            {error && (
                <div className="mt-4 rounded-sm border-2 border-red-600 bg-red-100/80 px-2 py-3 text-red-600">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
}
