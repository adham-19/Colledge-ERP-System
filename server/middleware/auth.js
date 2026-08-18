import jwt from "jsonwebtoken";
import crypto from "crypto";
import Admin from "../models/admin.js";
import Student from "../models/student.js";
import Faculty from "../models/faculty.js";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decodedData = jwt.verify(token, process.env.SECRETKEY);

    req.userId = decodedData.id;
    req.role = decodedData.role;

    next();
  } catch (error) {
    console.log(error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Access token expired",
        code: "TOKEN_EXPIRED",
      });
    }

    return res.status(401).json({
      message: "Invalid access token",
      code: "INVALID_TOKEN",
    });
  }
};

export default auth;
