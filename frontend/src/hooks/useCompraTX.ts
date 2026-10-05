import { useAuthFetch } from '../hooks/useAuthFetch.ts'


type DatosCompra = {
    supplierId: string;
    cellPhone: string;
    value: number;
};

export function useCompraTX() {

    const { Authfecth } = useAuthFetch()

    async function compra(datosCompra: DatosCompra) {

        try {
            
            const API_URL = import.meta.env.VITE_API_URL;

            const request = await Authfecth(`${API_URL}/buy`, {
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