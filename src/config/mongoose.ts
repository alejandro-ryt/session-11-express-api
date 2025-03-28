import { connect, set } from "mongoose";

const DB_URI = process.env.MONGO_DB_URI

console.log(DB_URI);


// Connection to db
export const connectToDB = async () => {
    try {
      set('strictQuery', false);

      if (!DB_URI) throw new Error('DB URI is not defined');

      const db = await connect(DB_URI);
      console.log('MongoDB connected to', db.connection.name);
      // Emit an event when the connection is successful
    } catch (error) {
      console.error(error);
      // Emit an event when there's an error
    }
  };