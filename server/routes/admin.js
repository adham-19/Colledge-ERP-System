import express from "express";
import auth from "../auth/auth.js";
import {
  loginAdmin,
  getAllAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword,
  createNotice,
  getAllNotices,
  addDepartment,
  getAllDepartments,
  deleteDepartment,
  addFaculty,
  getAllFaculties,
  deleteFaculty,
  addSubject,
  getAllSubjects,
  deleteSubject,
  addStudent,
  getAllStudents,
  deleteStudent,
} from "../controllers/admin.js";
const router = express.Router();

router.post("/login", loginAdmin);
router.put("/change-password", auth, changePassword);

router.post("/", addAdmin);
router.get("/", getAllAdmins);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);

router.post("/notice/", createNotice);
router.get("/notice/", getAllNotices);

router.post("/department/", addDepartment);
router.get("/department/", getAllDepartments);
router.delete("/department/:id", deleteDepartment);

router.post("/faculty/", addFaculty);
router.get("/faculty/", getAllFaculties);
router.delete("/faculty/:id", deleteFaculty);

router.post("/subject/", addSubject);
router.get("/subject/", getAllSubjects);
router.delete("/subject/:id", deleteSubject);

router.post("/student/", addStudent);
router.get("/student/", getAllStudents);
router.delete("/student/:id", deleteStudent);

export default router;
