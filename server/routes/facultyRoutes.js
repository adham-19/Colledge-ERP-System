import express from "express"
import {loginFaculty,updatepassword,updateFaculty}from "../controllers/facultyController";
const router = express.Router();
router.post("/login", loginFaculty);
router.post("/updatepassword",  updatepassword);
router.post("/updateprofile",  updateFaculty);
export default router;