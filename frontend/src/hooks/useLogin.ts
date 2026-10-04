import { useContext } from "react";
import { AuthContext } from '../context/AuthContext'
import {useAuthFetch} from '../hooks/useAuthFetch.ts'


export function useLogin() {

    const { setAccesToken } = useContext(AuthContext)

    async function login(loginDate) {
        const request = await fetch("http://localhost:3000/auth/login", {
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