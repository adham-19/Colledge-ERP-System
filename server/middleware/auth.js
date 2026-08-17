import jwt from "jsonwebtoken";
import crypto from 'crypto';
import Admin from "../models/admin.js";
import Student from "../models/student.js";
import Faculty from "../models/faculty.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECRETKEY);
      req.userId = decodedData?.id;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;