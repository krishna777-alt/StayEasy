import { Router } from "express";
import { login, refresh, registerUser } from "../controllers/authController.js";

const route = Router();

route.post("/signup", registerUser);
route.post("/login", login);
route.post("/refresh", refresh);
export default route;
