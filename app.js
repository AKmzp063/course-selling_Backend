import express from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./middleware/Error.js";
import cors from "cors";

config({
    path: "./config/config.env",
});
const app = express()

//using Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE"],
}));


// Importing and Using Routes
import course from "./routes/courseRoutes.js";
import user from "./routes/userRoutes.js";
import payment from "./routes/paymentRoutes.js";
import other from "./routes/otherRoutes.js";


app.use("/api/v1", course);
app.use("/api/v1", user);
app.use("/api/v1", payment);
app.use("/api/v1", other);



export default app;

app.get("/",(req, res)=>res.send(`<h1>Site is Working. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit Frontend</h1>`));


app.use(ErrorMiddleware);