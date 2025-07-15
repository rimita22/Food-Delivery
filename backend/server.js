import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config';
import cartRouter from "./routes/cartRoute.js";
import testRoute from "./routes/testRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// ✅ CORS setup
app.use(cors({
    origin: "https://food-delivery-fronteend.vercel.app",
    credentials: true
}));



// connect to DB
connectDB();

// api routes
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api", testRoute);

app.get("/", (req, res) => {
    res.send("API is working");
});

// start server
app.listen(port, () => {
    console.log(`✅ Server started on ${process.env.BASE_URL || `http://localhost:${port}`}`);
    console.log(`✅ process.cwd(): ${process.cwd()}`);
    console.log(`✅ JWT_SECRET is: ${process.env.JWT_SECRET ? 'Loaded' : 'Not set'}`);
});
