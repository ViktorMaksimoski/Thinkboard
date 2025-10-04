import  express  from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from "dotenv"
import rateLimiter from './middlewares/rateLimiter.js'
import cors from "cors"

dotenv.config()

console.log(process.env.MONGO)

const app = express();

//middlewares
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())
app.use(rateLimiter)


//routes
app.use("/api/notes", notesRoutes)

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on PORT 5001")
    })
})

