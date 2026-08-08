import express from "express"
import {loginFaculty,updatepassword,updateFaculty,createTest,getTest,getStudent,uploadMarks,markAttendance}from "../controllers/facultyController";
import auth from "../middleware/auth"
const router = express.Router();
router.post("/login", loginFaculty);
router.post("/updatepassword",auth,  updatepassword);
router.post("/updateprofile", auth, updateFaculty);

router.post("/createtest", auth, createTest);
router.post("/gettest", auth, getTest);
router.post("/getstudent", auth, getStudent);
router.post("/uploadmarks", auth, uploadMarks);
router.post("/markattendance", auth, markAttendance);

export default router;