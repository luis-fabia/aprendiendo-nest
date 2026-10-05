type Transaccion = {
    cellPhone: string;
    message: string;
    transactionalID: string;
    value: number;
};

type TicketProps = {
    transaccion: Transaccion;
    onContinuar: () => void;
};

export function Ticket({transaccion,onContinuar}: TicketProps) {

    return (

        <div className="modal-overlay">



            <div className="ticket">

                <h2>Recarga exitosa</h2>
                <div className="ticket-dato">
                    <span>Celular</span>
                    <strong>{transaccion.cellPhone}</strong>
                </div>

                <div className="ticket-dato">
                    <span>Valor</span>
                    <strong>${transaccion.value}</strong>
                </div>

                <div className="ticket-dato">
                    <span>Ticket</span>
                    <strong>{transaccion.transactionalID}</strong>
                </div>

                <button
                    className="btn-continuar"
                    onClick={onContinuar}
                >
                    Continuar
                </button>

            </div>

        </div>
    );
}