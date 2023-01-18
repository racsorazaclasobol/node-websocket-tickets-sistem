import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
import dataDb from "../data/data.json" assert { type: "json" };

const __dirname = path.dirname( fileURLToPath( import.meta.url ) );

class Ticket {

    constructor ( numero, escritorio ) {

        this.numero = numero;
        this.escritorio = escritorio;

    }

}

class TicketControl {//clase 227

    constructor() {

        this.ultimo     = 0;
        this.hoy        = new Date().getDate();
        this.tickets    = [];
        this.ultimos4   = [];

        this.init();
    }

    get toJson() {

        return {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4,
        }

    }

    init() {

        const { hoy, tickets, ultimo, ultimos4 } = dataDb;

        if( hoy !== this.hoy ) return this.guardarDB();

        this.tickets    = tickets;
        this.ultimo     = ultimo;
        this.ultimos4   = ultimos4

    }

    guardarDB() {

        const dbPath = path.join( __dirname, '../data/data.json' );
        fs.writeFileSync( dbPath, JSON.stringify( this.toJson ) )

    }

    siguiente( ) {
        this.ultimo += 1;
        const ticket = new Ticket( this.ultimo, null );
        this.tickets.push( ticket );

        this.guardarDB();
        return `Ticket ${ this.ultimo }`
    }

    obtenerUltimo( ) {
        return `Ticket ${ this.ultimo }`
    }

    atenderTicket( escritorio ) {

        //No tenemos tickets
        if( this.tickets.length === 0 ) return null;

        const ticket = this.tickets[0];
        this.tickets.shift();

        ticket.escritorio = escritorio;

        this.ultimos4.unshift( ticket );

        if( this.ultimos4.length > 4 ) {
            this.ultimos4.pop();
        }

        this.guardarDB();

        return ticket;
    }

}

export default TicketControl;