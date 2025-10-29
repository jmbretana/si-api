import express from "express";
import unifyController from "../controllers/unify-data.controller";

const router = express.Router();

router.get("/", unifyController.getCurrent.bind(unifyController));
router.put("/", unifyController.update.bind(unifyController));

export default router;
