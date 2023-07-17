import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  username: String ,
  age: Number,
  email: { type: String, unique: true },
  password: String,
  confirmPassword: String,
  image: String,
  cart: Array,
  history: Array,
}, { timestamps: true });

const User = models.user || model('user', UserSchema);
export default User