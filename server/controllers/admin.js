import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import adminModel from "../models/admin.js";
import departmentModel from "../models/department.js";
import noticeModel from "../models/notice.js";
import fucultyModel from "../models/faculty.js";
import subjectModel from "../models/subject.js";
import studentModel from "../models/student.js";

const defaultAdminPassword = "Admin12349876";
const defaultFacultyPassword = "Faculty12349876";
const defaultStudentPassword = "Student12349876";

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email, Password required" });
    }

    const admin = await adminModel.findOne({ email }).select("+password");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.SECRETKEY,
    );

    res.status(200).json({ success: true, message: "Login Done", data: token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin CRUD
const addAdmin = async (req, res) => {
  try {
    const { name, email, department, contactNumber, dob, avatar } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Email, Name required" });
    }

    const admin = await adminModel.findOne({ email });
    if (admin) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingDepartment = await departmentModel.findOne({ department });
    if (!existingDepartment) {
      return res
        .status(404)
        .json({ success: false, message: "Department Not Found" });
    }

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
      username,
      departmentId: existingDepartment._id,
      contactNumber,
      dob,
      avatar,
      password: defaultAdminPassword,
      joiningYear: new Date().getFullYear(),
    });
    res
      .status(201)
      .json({ success: true, message: "Admin added successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const department = req.query.department;
    const query = {};

    if (department) {
      const departmentDoc = await departmentModel
        .findOne({ department })
        .select("_id");
      if (!departmentDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Department Not Found" });
      }

      query.departmentId = departmentDoc._id;
    }
    const admins = await adminModel.find(query);

    res.status(200).json({ success: true, data: admins });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Id required" });
    }

    const admin = await adminModel.findById(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }

    const { name, department, contactNumber, dob, avatar } = req.body;

    if (name) {
      admin.name = name;
    }
    if (department) {
      const departmentDoc = await departmentModel.findOne({ department });
      if (!departmentDoc) {
        return res
          .status(404)
          .json({ success: false, message: "Department Not Found" });
      }
      admin.departmentId = departmentDoc._id;
    }
    if (contactNumber) {
      admin.contactNumber = contactNumber;
    }
    if (dob) {
      admin.dob = dob;
    }
    if (avatar) {
      admin.avatar = avatar;
    }

    await admin.save();
    res
      .status(200)
      .json({ success: true, message: "Admin updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "Id required" });
    }

    const admin = await adminModel.findByIdAndDelete(id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Password Part
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Current Password, New Password, Confirm Password required",
      });
    }

    const admin = await adminModel
      .findById(req.user.id)
      .select("updatedPassword +password");
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin Not Found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Confirm Password and New Password don't match",
      });
    }

    admin.password = newPassword;
    if (!admin.updatedPassword) {
      admin.updatedPassword = true;
    }
    await admin.save();

    res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Notice Part
const createNotice = async (req, res) => {
  try {
    const { topic, date, content, from, noticeFor } = req.body;
    if (!topic || !date || !content || !from || !noticeFor) {
      return res.status(400).json({
        success: false,
        message: "Topic, Date, Content, From, NoticeFor required",
      });
    }

    const exisitingNotice = await noticeModel.findOne({ topic, content, date });
    if (exisitingNotice) {
      return res
        .status(400)
        .json({ success: false, message: "Notice already created" });
    }

    const newNotice = await noticeModel.create({
      topic,
      date,
      content,
      from,
      noticeFor,
    });

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: newNotice,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllNotices = async (req, res) => {
  try {
    const notices = await noticeModel.find();
    res.status(200).json({ success: true, data: notices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Department Part
const addDepartment = async (req, res) => {
  try {
    const { department } = req.body;
    if (!department) {
      return res
        .status(400)
        .json({ success: false, message: "Department required" });
    }

    const existingDepartment = await departmentModel.findOne({ department });
    if (existingDepartment) {
      return res
        .status(400)
        .json({ success: false, message: "Department already added" });
    }

    const departments = await departmentModel.find();
    let add = departments.length + 1;

    const initials = department
      .trim()
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");

    let departmentCode;
    if (add < 10) {
      departmentCode = `${initials}0${add}`;
    } else {
      departmentCode = `${initials}${add}`;
    }

    const newDepartment = await departmentModel.create({
      department,
      departmentCode,
    });

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      data: newDepartment,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentModel.find();
    res.status(200).json({ success: true, data: departments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;

    const department = await departmentModel.findByIdAndDelete(id);
    if (!department) {
      return res
        .status(404)
        .json({ success: false, message: "Department Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Department deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Faculty Part
const addFaculty = async (req, res) => {
  try {
    const {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email,
      gender,
      designation,
    } = req.body;
    if (!name || !email || !designation || !department || !dob) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Designation, Department, DateOfBirth required",
      });
    }

    const existingFaculty = await facultyModel.findOne({ email });
    if (existingFaculty) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingDepartment = await departmentModel.findOne({ department });
    if (!existingDepartment) {
      return res
        .status(404)
        .json({ success: false, message: "Department Not Found" });
    }
    let departmentHelper = existingDepartment.departmentCode;

    const faculties = await facultyModel.find({ department });
    let helper;
    if (faculties.length < 10) {
      helper = "00" + faculties.length.toString();
    } else if (faculties.length < 100 && faculties.length > 9) {
      helper = "0" + faculties.length.toString();
    } else {
      helper = faculties.length.toString();
    }
    let date = new Date();
    let components = ["FAC", date.getFullYear(), departmentHelper, helper];
    const username = components.join("");

    const hashedPassword = await bcrypt.hash(defaultFacultyPassword, 10);
    const passwordUpdated = false;

    const newFaculty = await facultyModel.create({
      name,
      email,
      password: hashedPassword,
      joiningYear: new Date().getFullYear(),
      username,
      department,
      avatar,
      contactNumber,
      dob,
      gender,
      designation,
      passwordUpdated,
    });

    res.status(201).json({
      success: true,
      message: "Faculty added successfully",
      response: newFaculty,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllFaculties = async (req, res) => {
  try {
    const department = req.query.department;
    const query = {};

    if (department) {
      query.department = department;
    }

    const faculties = await facultyModel.find(query);

    res.status(200).json({ success: true, data: faculties });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const id = req.params.id;

    const faculty = await facultyModel.findByIdAndDelete(id);
    if (!faculty) {
      return res
        .status(404)
        .json({ success: false, message: "Faculty Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Faculty deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Subject Part
const addSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, department, totalLectures, year } =
      req.body;
    if (!subjectName || !subjectCode || !department || !year) {
      return res.status(400).json({
        success: false,
        message: "SubjectName, SubjectCode, Department, Year required",
      });
    }

    const subject = await subjectModel.findOne({ subjectCode });
    if (subject) {
      return res
        .status(400)
        .json({ success: false, message: "Subject already added" });
    }

    const newSubject = await subjectModel.create({
      totalLectures,
      department,
      subjectCode,
      subjectName,
      year,
    });

    const students = await studentModel.find({ department, year });
    if (students.length !== 0) {
      for (let i = 0; i < students.length; i++) {
        students[i].subjects.push(newSubject._id);
        await students[i].save();
      }
    }

    res.status(201).json({
      success: true,
      message: "Subject added successfully",
      data: newSubject,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const { department, year } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }
    if (year) {
      query.year = year;
    }

    const subjects = await subjectModel.find(query);
    res.status(200).json({ success: true, data: subjects });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const id = req.params.id;

    const subject = await subjectModel.findByIdAndDelete(id);
    if (!subject) {
      return res
        .status(404)
        .json({ success: false, message: "Subject Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Subject deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, messase: err.message });
  }
};

// Student Part
const addStudent = async (req, res) => {
  try {
    const {
      name,
      dob,
      department,
      contactNumber,
      avatar,
      email,
      section,
      gender,
      batch,
      fatherName,
      motherName,
      fatherContactNumber,
      motherContactNumber,
      year,
    } = req.body;
    if (!name || !email || !year || !department || !section || !dob) {
      return res.status(400).json({
        success: false,
        message: "Name, Email, Year, Department, Section, DateOfBirth required",
      });
    }

    const existingStudent = await studentModel.findOne({ email });
    if (existingStudent) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const existingDepartment = await departmentModel.findOne({ department });
    if (!existingDepartment) {
      return res
        .status(404)
        .json({ success: false, message: "Department Not Found" });
    }

    let departmentHelper = existingDepartment.departmentCode;

    const students = await studentModel.find({ department });
    let helper;
    if (students.length < 10) {
      helper = "00" + students.length.toString();
    } else if (students.length < 100 && students.length > 9) {
      helper = "0" + students.length.toString();
    } else {
      helper = students.length.toString();
    }
    let date = new Date();
    let components = ["STU", date.getFullYear(), departmentHelper, helper];
    let username = components.join("");

    let hashedPassword = await bcrypt.hash(defaultStudentPassword, 10);
    let passwordUpdated = false;

    const newStudent = await studentModel.create({
      name,
      dob,
      password: hashedPassword,
      username,
      department,
      contactNumber,
      avatar,
      email,
      section,
      gender,
      batch,
      fatherName,
      motherName,
      fatherContactNumber,
      motherContactNumber,
      year,
      passwordUpdated,
    });

    const subjects = await subjectModel.find({ department, year });
    if (subjects.length !== 0) {
      for (var i = 0; i < subjects.length; i++) {
        newStudent.subjects.push(subjects[i]._id);
      }
      await newStudent.save();
    }

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: newStudent,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { department, year, section } = req.query;
    const query = {};

    if (department) {
      query.department = department;
    }
    if (year) {
      query.year = year;
    }
    if (section) {
      query.section = section;
    }

    const students = await studentModel.find(query);
    res.status(200).json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await studentModel.findByIdAndDelete(id);
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export {
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
};
