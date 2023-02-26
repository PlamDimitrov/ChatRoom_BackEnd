import mongoose, { Schema } from 'mongoose';
import IUser from '../Interfaces/IUser';

const Schema = mongoose.Schema;
const Model = mongoose.model;

const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema<IUser>({

  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },

});

const UserModel = Model('User', userSchema);
export = UserModel;