const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminModel = require("../models/admin");
const defaultPassword = "Admin12349876";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Email, Password required");
    }

    const admin = await adminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(404).json("Admin Not Found");
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json("Password is incorrect");
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.SECRETKEY,
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find();
    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAdminsByDepartment = async (req, res) => {
  try {
    const department = req.params.department;
    if (!department) {
      return res.status(400).json({ message: "Department required" });
    }

    const admins = await adminModel.find({ department });
    if (admins.length === 0) {
      return res.status(404).json({ message: "Department Not Found" });
    }

    res.status(200).json({ admins });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { name, email, department, contactNumber, dateOfBirth, avatar } =
      req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Email, Name required" });
    }

    const admin = await adminModel.findOne({ email });
    if (admin) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // TEST AFTER MERGE
    const existingDepartment = await departmentModel.findOne({ department });
    let departmentHelper = existingDepartment.departmentCode;
    const admins = await adminModel.find({ department });

    let helper;
    if (admins.length < 10) {
      helper = "00" + admins.length.toString();
    } else if (admins.length < 100 && admins.length > 9) {
      helper = "0" + admins.length.toString();
    } else {
      helper = admins.length.toString();
    }
    let date = new Date();
    let components = ["ADM", date.getFullYear(), departmentHelper, helper];

    const username = components.join("");

    const newAdmin = await adminModel.create({
      name,
      email,
      userName,
      department,
      contactNumber,
      dateOfBirth,
      avatar,
      password: defaultPassword,
      joiningYear: new Date().getFullYear(),
    });
    res.status(200).json({ message: "Admin added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, department, contactNumber, dateOfBirth, avatar } =
      req.body;
    if (!id) {
      return res.status(400).json({ message: "Id required" });
    }

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    if (name) {
      admin.name = name;
    }
    if (department) {
      admin.department = department;
    }
    if (contactNumber) {
      admin.contactNumber = contactNumber;
    }
    if (dateOfBirth) {
      admin.dateOfBirth = dateOfBirth;
    }
    if (avatar) {
      admin.avatar = avatar;
    }

    await admin.save();
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Id required" });
    }

    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(400)
        .json("Current Password, New Password, Confirm Password required");
    }

    const admin = await adminModel
      .findById(req.user.id)
      .select("updatedPassword +password");
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Confirm Password and New Password don't match" });
    }

    admin.password = newPassword;
    if (!admin.updatedPassword) {
      admin.updatedPassword = true;
    }
    await admin.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  loginAdmin,
  getAllAdmins,
  getAdminsByDepartment,
  addAdmin,
  updateAdmin,
  deleteAdmin,
  changePassword,
};
