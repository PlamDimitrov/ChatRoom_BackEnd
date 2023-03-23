import mongoose, { Schema } from 'mongoose';
import IUser from '../Interfaces/IUser';

const Model = mongoose.model;

const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema<IUser>({

  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },

});

const UserModel = Model('User', userSchema);
export = UserModel;