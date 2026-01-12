import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '20kb' })); // for parsing application/json
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //For url encoding
app.use(express.static("public")); // for serving static files
app.use(cookieParser()); //for parsing cookies
// Routes import 
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users", userRouter);
export { app };
