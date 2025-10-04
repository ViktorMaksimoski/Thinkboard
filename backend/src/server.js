import  express  from 'express'
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from "dotenv"
import rateLimiter from './middlewares/rateLimiter.js'
import cors from "cors"
import path from "path"

dotenv.config()

console.log(process.env.MONGO)

const app = express();
const __dirname = path.resolve()

//middlewares
if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173"
    }))
}

app.use(express.json())
app.use(rateLimiter)


//routes
app.use("/api/notes", notesRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get((req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server running on PORT 5001")
    })
})

