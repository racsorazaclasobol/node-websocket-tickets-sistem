//Referencias HTML
const lblTicket1 = document.querySelector('#lblTicket1');
const lblTicket2 = document.querySelector('#lblTicket2');
const lblTicket3 = document.querySelector('#lblTicket3');
const lblTicket4 = document.querySelector('#lblTicket4')
const lblEscritorio1 = document.querySelector('#lblEscritorio1');
const lblEscritorio2 = document.querySelector('#lblEscritorio2');
const lblEscritorio3 = document.querySelector('#lblEscritorio3');
const lblEscritorio4 = document.querySelector('#lblEscritorio4');


const socket = io();

socket.on('connect', () => {


});

socket.on('disconnect', () => {


});

socket.on( 'estado-actual', ( payload ) => {

    const audio = new Audio('./audio/new-ticket.mp3');
    if( payload.length >= 1 ) audio.play();

    const [ ticket1, ticket2, ticket3, ticket4 ] = payload;

    lblTicket1.innerText = ( ticket1 ) ? `Ticket ${ ticket1.numero }` : 'Ticket W';
    lblTicket2.innerText = ( ticket2 ) ? `Ticket ${ ticket2.numero }` : 'Ticket X';
    lblTicket3.innerText = ( ticket3 ) ? `Ticket ${ ticket3.numero }` : 'Ticket Y';
    lblTicket4.innerText = ( ticket4 ) ? `Ticket ${ ticket4.numero }` : 'Ticket Z';
    lblEscritorio1.innerText = ( ticket1 ) ? ticket1.escritorio : 'Escritorio W';
    lblEscritorio2.innerText = ( ticket2 ) ? ticket2.escritorio : 'Escritorio X';
    lblEscritorio3.innerText = ( ticket3 ) ? ticket3.escritorio : 'Escritorio Y';
    lblEscritorio4.innerText = ( ticket4 ) ? ticket4.escritorio : 'Escritorio Z';

});





