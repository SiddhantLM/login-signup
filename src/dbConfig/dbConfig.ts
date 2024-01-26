import mongoose from "mongoose";
// import mongoose from "mongoose";

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("connection made to the db");
    });

    connection.on("error", (error) => {
      console.log("could not connect to the db (inside the try block)" + error);
      process.exit();
    });
  } catch (error) {
    console.log("connection to db unsuccesful");
    console.log({ error }, { status: 300 });
  }
}
