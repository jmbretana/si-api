import express from "express";
import spController from "../controllers/sp.controller";

const router = express.Router();

router.get("/", spController.getCurrent.bind(spController));
router.get("/last", spController.getLast.bind(spController));
router.put("/", spController.update.bind(spController));
router.post("/saveSP", spController.create.bind(spController));

export default router;
