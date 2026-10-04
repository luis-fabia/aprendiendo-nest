import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAuthFetch } from '../hooks/useAuthFetch.ts'


export function useCompraTX() {

    const { accesToken } = useContext(AuthContext);
    const { Authfecth } = useAuthFetch()

    async function compra(datosCompra) {

        try {

            const request = await Authfecth("http://localhost:3000/buy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(datosCompra)
            });

            if (!request) {
                return {
                    ok: false,
                    error: "Sesión expirada"
                };
            }

            const datos = await request.json();

            if (!request.ok) {
                return {
                    ok: false,
                    error: datos.message[0]
                }
            }


            return {
                ok: true,
                data: datos
            };

        } catch (error) {

            return {
                ok: false,
                error: "No fue posible comunicarse con el servidor"
            };

        }
    }

    return {
        compra
    };
}