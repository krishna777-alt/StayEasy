import express from "express";
import session from "express-session";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import methodOverride from "method-override";

import userRoute from "./routes/userRoute.js";
import hotelRoute from "./routes/hotelRoute.js";
import adminRoute from "./routes/adminRoute.js";

dotenv.config();

const app = express();

// ========================== CORS ==========================

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// ========================== Body Parsers ==========================

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ========================== Cookie Parser ==========================

app.use(cookieParser());

// ========================== Session ==========================

// Keep this temporarily in case another part of your application uses sessions.
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  }),
);

// ========================== Method Override ==========================

app.use(methodOverride("_method"));

// ========================== Routes ==========================

app.use("/api", userRoute);
app.use("/api/hotels", hotelRoute);
app.use("/api/admin", adminRoute);

export default app;
