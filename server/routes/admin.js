const express = require("express");
const auth = require("../auth/auth");
const {
  loginAdmin,
  getAllAdmins,
  getAdminsByDepartment,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword,
} = require("../controllers/admin");
const router = express.Router();

router.post("/login", loginAdmin);
router.put("/change-password", auth, changePassword);

router.get("/", getAllAdmins);
router.get("/:department", getAdminsByDepartment);

router.post("/", addAdmin);
router.put("/:id", updateAdmin);
router.delete("/:id", deleteAdmin);


module.exports = router;
