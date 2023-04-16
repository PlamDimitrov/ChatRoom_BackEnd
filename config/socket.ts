import http from 'http';
import { Server } from 'socket.io';
import { config } from "../config/config";

export default class Socket {
  public io: any;

  constructor(private app: any) { }

  createServer(port: any, callback: Function) {
    const server = http.createServer(this.app).listen(
      port, callback()
    );
    this.io = new Server(server, {
      cors: {
        origin: config.port
      }
    });

    this.io.sockets.on('connection', function (socket: any) {
      let roomName: string = '';
      socket.on('create', function (room: string) {
        roomName = room;
        socket.join(room);
        console.log(`Joined room: ${room}`);
      });
      socket.on('message-form-client', (data: any) => {
        console.log('received!');
        console.log(data.roomName);
        console.log(data.message);
        socket.to(roomName).emit('message-from-server', data.message);
      })
    });
  }
}