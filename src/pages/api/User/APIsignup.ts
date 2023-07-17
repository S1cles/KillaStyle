import { NextApiRequest, NextApiResponse } from 'next';
import connectMongoAuth from '../database';
import User from '../models/userModel';
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

export default async function APIsignup(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongoAuth();
    const { confirmPassword, password,username ,email} = req.body;
    if (confirmPassword !== password) {
      return res.status(500).json('Password Error');
    }
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(500).json('User already exists');
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = await bcrypt.hashSync(password, salt);
    req.body.password = hashPass;
    const userdata = await User.create(req.body);
    const mongoId = userdata._id
    const tokenExpirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const token = jwt.sign({ exp: tokenExpirationTime, email:email, username:username, mongoId:mongoId }, process.env.SECRET);
    console.log('Created');
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}
