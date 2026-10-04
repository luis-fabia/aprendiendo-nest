import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    accesToken: string;
    setAccesToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }) {

    const [accesToken, setAccesToken] = useState(() => {
        return localStorage.getItem("Token") ?? "";
    });

    useEffect(() => {
        if (accesToken) {
            localStorage.setItem("Token", accesToken);
        } else {
            localStorage.removeItem("Token");
        }
    }, [accesToken]);

    return (
        <AuthContext.Provider
            value={{
                accesToken,
                setAccesToken
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}