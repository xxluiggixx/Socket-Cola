
const lblEscritorio     = document.querySelector('h1');
const btnAtender        = document.querySelector('button');
const lblTicketNumber   = document.querySelector('#ticketNumber');
const divAlerta         = document.querySelector('.alert');
const lblPendientes         = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

divAlerta.style.display = 'none';

const socket = io();

socket.on('ultimo-ticket', (ultimoTicket) => {
    //lblNuevoTicket.innerText = "Ticket " + ultimoTicket;
})

socket.on('tickets-pendientes', (ticketsPendientes) => {
    if(ticketsPendientes === 0){
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = ticketsPendientes;
    }

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;
});




btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', { escritorio }, ( payload ) => {
        const { ok, ticket , msg } = payload;
        if (!ok){
            lblTicketNumber.innerText = ' Nadie.'
           return divAlerta.style.display = '';
        } 
            
            lblTicketNumber.innerText = ticket?.numero;

    })
    /* socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    }); */

});