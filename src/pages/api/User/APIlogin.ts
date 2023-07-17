import { NextApiRequest, NextApiResponse } from 'next';
import User from '../models/userModel';
import connectMongoAuth from '../database';
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoAuth();
    console.log(req.body);
    const { password, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json('User not found');
    }
    const mongoId = user._id
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json('Invalid password');
    }
    const tokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const token = jwt.sign({ exp: tokenExpirationTime, email: user.email, username: user.username, mongoId: mongoId }, process.env.SECRET);

    console.log('Logged in');
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}