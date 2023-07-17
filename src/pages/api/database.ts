import mongoose from 'mongoose';

const connectMongoAuth = async () => mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://S1cles:S1cless1cles@cluster0.nglvfet.mongodb.net/auth');

export default connectMongoAuth;
