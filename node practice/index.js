import express, { json } from "express"
import { db } from "./database/db.js";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import cors from "cors";

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    
}))
configDotenv()



// console.log(process.env.MONGO_URI);
db()



import authRoutes from "./routes/user.route.js"

app.use("/api/auth", authRoutes)

app.listen(3000,()=>{
    console.log("app running on port " + 3000);
    
})