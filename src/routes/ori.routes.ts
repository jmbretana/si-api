import express from "express";
import oriController from "../controllers/ori.controller";

const router = express.Router();

router.get("/", oriController.getCurrent.bind(oriController));
router.get("/lastOri", oriController.getLast.bind(oriController));
router.put("/", oriController.update.bind(oriController));
router.post("/saveOri", oriController.create.bind(oriController));

export default router;
