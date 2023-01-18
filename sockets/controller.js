import TicketControl from '../models/tikcket-control.js';

const tickerControl = new TicketControl();


const socketController = ( socket ) => { //Clase 220

    socket.emit( 'ultimo-ticket', tickerControl.obtenerUltimo() );
    socket.emit( 'ticket-pendiente', tickerControl.tickets.length );
    
    socket.on( 'generar-ticket', ( payload, callback ) => { //Clase 219
        
        const siguiente = tickerControl.siguiente();
        
        callback( siguiente );
        
        
        socket.broadcast.emit( 'ticket-pendiente', tickerControl.tickets.length );
        
    });

    socket.on( 'atender-ticket', ( { escritorio }, callback ) => {

        if ( !escritorio ) return callback({ ok: false, msg: 'El escritorio es obligatorio' });
        
        const ticket = tickerControl.atenderTicket( escritorio );
        
        socket.broadcast.emit( 'estado-actual', tickerControl.ultimos4 );
        
        socket.emit( 'ticket-pendiente', tickerControl.tickets.length );
        socket.broadcast.emit( 'ticket-pendiente', tickerControl.tickets.length );

        if( !ticket ) return callback({ ok: false, msg: 'Ya no hay tickets pendientes' });

        callback( { ok: true, ticket } );

    })


};

export {socketController}

