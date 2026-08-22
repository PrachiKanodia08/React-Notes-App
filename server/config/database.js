import mongoose from "mongoose"

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(process.env.MONGO_URI)
        console.log("MongoDB Connected Successfully")
        console.log(`Host: ${conn.connection.host}`)
        console.log(`Database: ${conn.connection.name}`)
        console.log("Connection State:", mongoose.connection.readyState)

    } catch (error) {

        console.error(error.message);

        process.exit(1);

    }
};

export default connectDB;