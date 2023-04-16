import models from '../Models';
import IChatRoom from '../Interfaces/IChatRoom';

class ChatRoomConproller {

  private createChatRoom(chatRoom: IChatRoom, req: any, res: any, next: any) {
    models.ChatRoom.create(chatRoom)
      .then((room) => {
        res.status(200);
        res.send(room);
      })
      .then(
        global.AppGlobal.io.on('connection', (socket: any) => {
          console.log(`Connected id: ${socket.id}`);
          console.log(socket);
          socket.on('message-form-client', (message: any) => {
            global.AppGlobal.io.emit('message-from-server', message);
          })
        })
      )
      .catch(err => {
        console.log(err);
        res.status(409)
        res.send(err)
      })
  }

  private findRoom(chatRoomName: String, req: any, res: any, next: any) {
    models.ChatRoom.findOne({ chatRoomName: { $eq: chatRoomName } })
      .then((room) => {
        if (room === null) {
          res.status(401).send({ error: 'No such room found!' });
          return;
        } else {
          res.send(room);
        }
      }).catch(err => {
        console.log(err);
        res.status(401)
        res.send(`Database error: ${err}`);
      })
  }

  public post = {

    createRoom: (req: any, res: any, next: any) => {
      console.log('connected!');
      const { chatRoomName } = req.body;
      this.createChatRoom(chatRoomName, req, res, next);
    },
    joinRoom: (req: any, res: any, next: any) => {
      const { chatRoomName } = req.body;
      this.findRoom(chatRoomName, req, res, next);
    }
  }
}

export default new ChatRoomConproller(); 