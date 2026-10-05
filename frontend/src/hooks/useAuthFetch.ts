import { useAuth } from "../context/AuthContext";

type AuthFetchOptions = RequestInit;

export function useAuthFetch() {

    const { accesToken, setAccesToken } = useAuth();

    async function Authfecth(
        url: string,
        opciones: AuthFetchOptions = {}
    ) {

        const response = await fetch(url, {
            ...opciones,
            headers: {
                ...opciones.headers,
                Authorization: `Bearer ${accesToken}`
            }
        });

        if (response.status === 401) {
            setAccesToken("");
            return;
        }

        return response;
    }

    return {
        Authfecth
    };
}