import {  useState } from "react";
import { RegistroTransacciones } from './RegistroTransacciones'
import { useCompraTX } from "../hooks/useCompraTX.js";
import { useSuppliers } from "../hooks/useSuppliers.js";
import { Ticket } from './Ticket.js'
import { useAuth } from "../context/AuthContext";


export default function ModuloRecargas() {


    const { setAccesToken } = useAuth();
    const [seleccion, setSeleccion] = useState(false);
    const [DatosCompra, setDatosCompra] = useState({
        supplierId: "",
        cellPhone: "",
        value: 0
    });


    const [cargando, setcargando] = useState(false)
    const [error, setError] = useState("")
    const { compra } = useCompraTX()
    const [ticket, setTicket] = useState(false)
    const [transaccion, setTransaccion] = useState({
        cellPhone: "",
        message: "",
        transactionalID: "",
        value: 0
    })

    const { suppliers } = useSuppliers();


    return (
        <>

            <div className="contenedor__general">
                <main className="modulo-recargas">

                    <div className="recargas-header">
                        <h1 className="Titulo">Puntored</h1>

                        <button
                            type="button"
                            className="btn-logout"
                            onClick={() => setAccesToken("")}
                        >
                            Cerrar sesión
                        </button>
                    </div>

                    <h2>Recargas</h2>
                    <select
                        className="select-operador"
                        value={DatosCompra.supplierId}
                        onChange={(e) => {
                            setDatosCompra({
                                ...DatosCompra,
                                supplierId: e.target.value
                            });

                            setSeleccion(true);
                        }}
                    >

                        <option value="">Seleccionar operador</option>

                        {suppliers.map((valor) => (
                            <option key={valor.id} value={valor.id}>
                                {valor.name}
                            </option>
                        ))}
                    </select>


                    {seleccion && (
                        <form
                            className="form-recarga"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                setcargando(true)
                                setError("")
                                const resultado = await compra(DatosCompra);

                                if (!resultado.ok) {
                                    setError(resultado.error)
                                }
                                else {
                                    setTicket(true)
                                    setTransaccion(resultado.data)

                                }
                                setcargando(false)
                                setSeleccion(false)

                            }}
                        >
                            <input
                                className="input-recarga"
                                type="text"
                                placeholder="Celular"
                                value={DatosCompra.cellPhone}
                                onChange={(e) =>
                                    setDatosCompra({
                                        ...DatosCompra,
                                        cellPhone: e.target.value
                                    })
                                }
                            />

                            <input
                                className="input-recarga"
                                type="number"
                                placeholder="Valor"
                                value={DatosCompra.value || ""}
                                onChange={(e) =>
                                    setDatosCompra({
                                        ...DatosCompra,
                                        value: Number(e.target.value)
                                    })
                                }
                            />

                            <button className="btn-comprar" type="submit">
                                {cargando ? "Procesando" : "Comprar"}
                            </button>

                        </form>
                    )}
                </main>

                {error &&
                    <p>{error}</p>}


                {ticket && <Ticket
                    transaccion={transaccion}
                    onContinuar={() => {
                        setTicket(false);
                        setDatosCompra({
                            supplierId: "",
                            cellPhone: "",
                            value: 0
                        });
                    }}
                />}



                <section className="seccion-transacciones">
                    <RegistroTransacciones />
                </section>

            </div >
        </>
    );
}