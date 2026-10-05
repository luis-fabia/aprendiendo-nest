import { useState } from "react";
import { useAuthFetch } from '../hooks/useAuthFetch.ts'


type Transaction = {
    id: string;
    transactionalID: string;
    cellPhone: string;
    value: number;
    createdAt: string;
};

export function RegistroTransacciones() {

    const [allTransaccion, setAllTransaccion] = useState<Transaction[]>([]);
    const [mostrar, setMostrar] = useState(false);
    const { Authfecth } = useAuthFetch()

    const API_URL = import.meta.env.VITE_API_URL;

    async function GetAllTransactions() {
        try {
            const resultado = await Authfecth(
                `${API_URL}/transactions`
            );

             if (!resultado) {
                return
            }
            
            const datos = await resultado.json();

           

            setAllTransaccion(datos);

        } catch (error) {
            console.error(error);
        }
    }

    function manejarTransacciones() {

        if (!mostrar) {
            GetAllTransactions();
        } else {
            setAllTransaccion([]);
        }

        setMostrar(!mostrar);
    }

    return (
        <div className="historial">

            <button className="btn-transacciones" onClick={manejarTransacciones}>
                {mostrar
                    ? "Ocultar transacciones"
                    : "Ver transacciones"
                }
            </button>

            {mostrar && (
                <div className="transacciones-contenedor">

                    <h2>Transacciones realizadas</h2>

                    {allTransaccion.length === 0 ? (
                        <p className="sin-transacciones">
                            No hay transacciones registradas.
                        </p>
                    ) : (

                        <div className="tabla-wrapper">

                            <table className="tabla-transacciones">

                                <thead>
                                    <tr>
                                        <th>Ticket</th>
                                        <th>Celular</th>
                                        <th>Valor</th>
                                        <th>Fecha</th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {allTransaccion.map((valor) => (
                                        <tr key={valor.id}>

                                            <td>
                                                {valor.transactionalID}
                                            </td>

                                            <td>
                                                {valor.cellPhone}
                                            </td>

                                            <td>
                                                ${valor.value}
                                            </td>

                                            <td>
                                                {new Date(
                                                    valor.createdAt
                                                ).toLocaleString()}
                                            </td>

                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>
                    )}

                </div>
            )}

        </div>
    );
}