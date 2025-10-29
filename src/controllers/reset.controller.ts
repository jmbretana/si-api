import { Request, Response } from "express";
import resetService from "../services/reset.service";

async function reset(req: Request, res: Response) {
  try {
    await resetService.reset();

    res.json({
      success: true,
    });
  } catch (err: any) {
    console.log("Login error:", err);
    // Return proper error response to client
    res.status(500).json({
      success: false,
      message: "Database connection error. Please try again later.",
      error: process.env.SHOW_ERROR_LOG === "true" ? err.message : undefined,
    });
  }
}

export default {
  reset,
};
