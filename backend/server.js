import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import testRoute from "./routes/testRoute.js";
import orderRouter from "./routes/orderRoute.js"
import cors from "cors";

// app config
const app = express()
const port = process.env.PORT || 4000;


//middleware
app.use(express.json())
//app.use(cors())

app.use(cors({
    origin: "https://food-delivery-fronteend.vercel.app",
    credentials: true
}));

// dB connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)
app.use("/api", testRoute);



app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(port,()=>{
    console.log(`Server Started on ${process.env.BASE_URL || `http://localhost:${port}`}`);

})

console.log("process.cwd() is:", process.cwd());
console.log("JWT_SECRET is:", process.env.JWT_SECRET);


//mongodb+srv://rimitasarkar2003:RIMITA22##@cluster0.irdkbvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
