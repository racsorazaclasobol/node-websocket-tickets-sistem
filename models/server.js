import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as socketServer } from 'socket.io'

import { socketController } from '../sockets/controller.js';

class Server {

    constructor(){

        //Servidor
        this.app = express();
        this.port = process.env.PORT,
        this.server = createServer( this.app ); //Clase 215
        this.io = new socketServer( this.server );

        //Rutas
        this.rutasPath = {}

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();

        // Sockets
        this.sockets();

    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){

        const {} = this.rutasPath;
        

    }

    sockets(){
        this.io.on('connection', socketController);
    }

    listen(){

        this.server.listen( this.port, () => {
            console.log( 'Servidor Socket IO corriendo en el puerto; ', this.port );
        });

    }

    async conectarDB(){

    }

}

export default Server;