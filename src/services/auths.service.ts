import { UserModel } from "../models/user.model";
import connectDB from "../config/database";
import * as cryptoModule from "crypto";
import "dotenv/config";

async function getLogin(params: any) {
  try {
    await connectDB();

    const hash = cryptoModule
      .createHash("sha256")
      .update(params.password)
      .digest("hex");

    const filter = { username: params.username, password: hash };
    const userData = await UserModel.findOne(filter).select("+password");

    if (userData !== null) {
      // Generate JWT token
      // const tokenPayload = {
      //   userId: userData._id,
      //   username: userData.username,
      //   name: userData.name,
      //   email: userData.email,
      // };

      const token = "AAA";
      //generateToken(tokenPayload, "24h");

      return {
        data: {
          user: {
            id: userData._id,
            username: userData.username,
          },
          token: token,
          expiresIn: "24h",
        },
        status: "success",
      };
    } else {
      return {
        data: [],
        status: "error",
        message: "Invalid username or password",
      };
    }
  } catch (parseErr: any) {
    // Throw the error so it can be properly handled by the controller
    throw new Error(`Database connection failed: ${parseErr.message}`);
  }
}

export default {
  getLogin,
};
