import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthFetch() {

    const { accesToken, setAccesToken } = useContext(AuthContext)

    async function Authfecth(url, opciones = {}) {

        const response = await fetch(url, {
            ...opciones,
            headers: {
                ...opciones.headers,
                Authorization: `Bearer ${accesToken}`
            }
        });

        if (response.status === 401) {
            setAccesToken("")
            return;
        }

        return response
    }

    return {
        Authfecth
    }


}
