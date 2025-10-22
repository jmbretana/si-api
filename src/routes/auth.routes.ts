import express from "express";
import authController from "../controllers/auth.controller";

const router = express.Router();

/* POST login */
router.post("/login", authController.getUserLogin.bind(authController));

export default router;
