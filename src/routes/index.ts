import express from "express";
import fcRoutes from "./fc.routes";
import spRoutes from "./sp.routes";
import oriRoutes from "./ori.routes";
import fcHistoryRoutes from "./fc-history.routes";
import oriHistoryRoutes from "./ori-history.routes";
import spHistoryRoutes from "./sp-history.routes";

import authRoutes from "./auth.routes";
import resetRoutes from "./reset.routes";
import unifyDataRoutes from "./unify-data.routes";

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// Main resources
router.use("/fc", fcRoutes);
router.use("/sp", spRoutes);
router.use("/ori", oriRoutes);

router.use("/reset", resetRoutes);
router.use("/unify-data", unifyDataRoutes);

// History resources
router.use("/fc-history", fcHistoryRoutes);
router.use("/ori-history", oriHistoryRoutes);
router.use("/sp-history", spHistoryRoutes);

export default router;
