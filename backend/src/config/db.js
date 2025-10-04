import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("MONGO CONNECTED SUCCESSFULLY")
    } catch(err) {
        console.error("ERROR CONNECTING TO MONGODB", err)
        process.exit(1)
    }
}