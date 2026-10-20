import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";
import methodOverride from "method-override";

import userRoute from "./routes/userRoute.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(methodOverride("_method"));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

// app.use("/", (req, res) => {
//   res.status(200).json({ message: "hello world" });
// });

app.use("/api/", userRoute);

export default app;
