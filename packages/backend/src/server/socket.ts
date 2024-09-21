import http from "http";
import logger from "../utils/logger";
import {Server} from "socket.io";


export function initializeSocket(server: http.Server) {

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:4200",
            methods: ["GET", "POST", "DELETE", "PUT"]
        }
    })

    io.on('connection', (socket) => {
        logger.info(`A uer connected: ${socket.id}`);

        socket.on('error',(error) => {
            logger.error(`Socket error: ${error}`)
        })

        socket.on('disconnect', () => {
            logger.info(`User disconnected: ${socket.id}`);
        })

        socket.on('message', (msg) => {
            logger.info(`Message received: ${msg}`);
            io.emit('message', msg);
        });

    });


    return io;
}