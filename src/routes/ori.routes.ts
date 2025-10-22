import express from "express";
import oriController from "../controllers/ori.controller";

const router = express.Router();

router.get("/", oriController.getCurrent.bind(oriController));
router.get("/last", oriController.getCurrent.bind(oriController));
router.put("/", oriController.update.bind(oriController));

export default router;
