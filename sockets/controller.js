const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
    
    //Estos eventos se ejecutan cuando un nuevo cliente se conecta
    socket.emit( 'tickets-pendientes', ticketControl.ticketsPendientes() );
    socket.emit ('ultimo-ticket', ticketControl.ultimo );
    socket.emit ('estado-actual', ticketControl.ultimos4 );

    socket.on('siguiente-ticket', ( payload, callback ) => {
        
        const siguiente = ticketControl.siguiente();
        callback( siguiente );
        socket.broadcast.emit('tickets-pendientes', ticketControl.ticketsPendientes() );

    });

    socket.on('atender-ticket', ({escritorio}, callback) =>{
        if( !escritorio ) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }
        
        //TODO: Notificar cambio en los ultimos 4
        socket.broadcast.emit('estado-actual', ticketControl.ultimos4 );
        //TODO: Notificar tickets pendientes
        socket.emit('tickets-pendientes', ticketControl.ticketsPendientes() );
        socket.broadcast.emit('tickets-pendientes', ticketControl.ticketsPendientes() );

        const ticket = ticketControl.atenderTicket( escritorio );
        if (!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else {
            callback({
                ok: true,
                ticket
            })
        }
    });

}



module.exports = {
    socketController
}

