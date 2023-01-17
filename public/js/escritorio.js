
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelectector('button');


const searchParams = new URLSearchParams( window.location.search );

if ( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
lblEscritorio.innerText = escritorio;

const socket = io();

socket.on('ultimo-ticket', (ultimoTicket) => {
    lblNuevoTicket.innerText = "Ticket " + ultimoTicket;
})

socket.on('connect', () => {

    btnCrear.disabled = false;

});

socket.on('disconnect', () => {

    btnCrear.disabled = true;
});




btnAtender.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

});