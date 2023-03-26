import mongoose, { Schema } from 'mongoose';
import IChatRoom from '../Interfaces/IChatRoom';

const Model = mongoose.model;

const { String } = Schema.Types;

const chatRoomSchema = new Schema<IChatRoom>({

  name: {
    type: String,
    required: true,
    unique: true
  }

});

const ChatRoomModel = Model('ChatRoom', chatRoomSchema);
export = ChatRoomModel;