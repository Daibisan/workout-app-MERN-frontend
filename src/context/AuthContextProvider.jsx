import { useReducer } from "react";
import AuthContext from "./AuthContext";

function authReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
            };
        default:
            return state;
    }
}

function initAuth() {
    const user = localStorage.getItem("user");
    return {
        user: user ? JSON.parse(user) : null,
    };
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(
        authReducer,
        {
            user: null,
        },
        initAuth,
    );

    console.log("AuthContext state: ", state);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
