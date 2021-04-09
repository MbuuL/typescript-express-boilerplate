import { model, Schema, Model, Document } from 'mongoose'

export interface IUser extends Document {
  email: string,
  name?: string,
  password: string
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: false, unique: false },
  password: { type: String, required: true, unique: false }
})

export const Users: Model<IUser> = model('User', UserSchema)