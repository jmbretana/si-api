import express from "express";
import resetController from "../controllers/reset.controller";

const router = express.Router();

/* POST login */
router.post("/", resetController.reset.bind(resetController));

export default router;
