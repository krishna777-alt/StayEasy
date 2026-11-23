import { Router } from "express";
import { getPayments } from "../controllers/clientController.js";
import { getUsers, updateUser } from "../controllers/adminController.js";
import { authenticate, authorize } from "../controllers/authController.js";

const router = Router();

router.get("/users", authenticate, authorize("admin"), getUsers);
router.patch("/users/:userId", authenticate, authorize("admin"), updateUser);
router.get("/payments", authenticate, authorize("admin"), getPayments);

export default router;
