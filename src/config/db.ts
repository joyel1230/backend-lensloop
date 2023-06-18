import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log('Connected to MongoDB');
  } catch (error) {
    throw new Error("Connection failed");
  }
};

export default connect;