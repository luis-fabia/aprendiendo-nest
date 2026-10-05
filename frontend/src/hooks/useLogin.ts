import { useAuth } from "../context/AuthContext";


type LoginData = {
    username: string;
    password: string;
};

export function useLogin() {
    const { setAccesToken } = useAuth();

                const API_URL = import.meta.env.VITE_API_URL;


    async function login(loginDate: LoginData) {
        const request = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginDate)
        })

        const datos = await request.json()
        setAccesToken(datos.accesToken)   
    }

    return {
        login
    }
}