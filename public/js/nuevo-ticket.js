//* Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnGenerar = document.querySelector('#btnGenerar');

const socket = io();

socket.on('connect', () => {

    btnGenerar.disabled = false;

});

socket.on('disconnect', () => {

    btnGenerar.disabled = true;

});

socket.on( 'ultimo-ticket', ( initialTicket ) => {

    lblNuevoTicket.innerText = initialTicket;

});


btnGenerar.addEventListener( 'click', () => {
    
    socket.emit( 'generar-ticket', undefined, ( ticket ) => {
        
        lblNuevoTicket.innerText = ticket;

    });

});