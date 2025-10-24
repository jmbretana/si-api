import express from "express";
import fcController from "../controllers/fc.controller";

const router = express.Router();

router.get("/", fcController.getCurrent.bind(fcController));
router.get("/last", fcController.getLast.bind(fcController));
router.put("/", fcController.update.bind(fcController));
router.post("/saveFC", fcController.create.bind(fcController));

export default router;
