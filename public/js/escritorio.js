//Referencias HTML
const btnAtender    = document.querySelector('#btnAtender');
const divAlerta     = document.querySelector('#divAlerta');
const lblEscritorio = document.querySelector('#lblEscritorio');
const lblPendientes = document.querySelector('#lblPendientes');
const lblTicket     = document.querySelector('#lblTicket');


const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has( 'escritorio' ) ) window.location = 'index.html';

const escritorio = searchParams.get( 'escritorio' );
divAlerta.style.display = 'none';
lblEscritorio.innerText = escritorio

const socket = io();

socket.on('connect', () => {

    btnAtender.disabled = false;

});

socket.on('disconnect', () => {

    btnAtender.disabled = true;

});

socket.on( 'ticket-pendiente', ( ticketsPendientes ) => {

    lblPendientes.innerText = ( ticketsPendientes ) ? ticketsPendientes : '0';
    btnAtender.disabled = ( ticketsPendientes ) ? false : true;
    divAlerta.style.display = ( ticketsPendientes ) ? 'none' : '';

});


btnAtender.addEventListener( 'click', () => {

    socket.emit( 'atender-ticket', { escritorio }, ( { ok, ticket, msg } ) => { 

        if( !ok ) {
            lblTicket.innerText = 'Atendiendo a Nadie'
            return divAlerta.style.display = ''
        };

        lblTicket.innerText = `Ticket ${ ticket.numero }`

    } )    
    

});


