import { Request, Response } from "express";
import authsService from "../services/auths.service";

async function getUserLogin(req: Request, res: Response) {
  try {
    const result = await authsService.getLogin(req.body);

    // Check if the service returned an error status
    if (result.status === "error") {
      return res.status(401).json({
        success: false,
        message: result.message || "Authentication failed",
      });
    }

    res.json({
      success: true,
      data: result.data,
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
  getUserLogin,
};
