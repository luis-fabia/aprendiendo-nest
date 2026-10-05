import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type AuthContextType = {
    accesToken: string;
    setAccesToken: React.Dispatch<React.SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [accesToken, setAccesToken] = useState<string>(() => {

        const datos = localStorage.getItem("Token");

        if (datos) {
            return JSON.parse(datos);
        }

        return "";
    });

    useEffect(() => {

        if (accesToken) {
            localStorage.setItem("Token", JSON.stringify(accesToken));
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

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth debe utilizarse dentro de AuthProvider"
        );
    }

    return context;
}