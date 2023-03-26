import http from 'http';
import { Server } from 'socket.io';
import { config } from "../config/config";

export default class Socket {

  constructor(private app: any) { }

  createServer(port: any, callback: Function) {
    const server = http.createServer(this.app).listen(
      port, callback()
    );
    const io = new Server(server, {
      cors: {
        origin: config.port
      }
    });

    io.on('connection', (socket) => {
      console.log(`Connected id: ${socket.id}`);

      socket.on('message-form-client', message => {
        io.emit('message-from-server', message);
      })
    });


  }
}