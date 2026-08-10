import faculty from "../models/faculty";
import Student from "../models/student";
import Subject from "../models/subject";
import Marks from "../models/marks";
import Test from "../models/test";
import attendance from "../models/attendance";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
//login faculty
export const loginFaculty = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = { usernameErr: String, passwordErr: String };
  try {
    const exsitingUser = await faculty.findOne({ email: email });
    if (!exsitingUser) {
      errors.usernameErr = "user do not exist";
      return res.status(404).json(errors);
    }
    //password checking
    const ismatch = bcrypt.compare(password, exsitingUser.password);
    if (!ismatch) {
      errors.passwordErr = "wrong userName or password";
      return res.status(404).json(errors);
    }
    //token generation
    const token = jwt.sign(
      { email: exsitingUser.email, id: exsitingUser._id },
      "secret",
      { expiresIn: "1h" },
    );
    return res.status(200).json({ result: exsitingUser, token: token });
  } catch (error) {
    return res.status(500).json({ message: "internal error" });
  }
};

//updated password
export const updatepassword = async (req, res, next) => {
  const { newPassword, confirmedPassword, email } = req.body;
  const errors = { mismatchError: String };
  if (newPassword !== confirmedPassword) {
    errors.mismatchError =
      "Your password and confirmation password do not match";
    return res.status(400).json(errors);
  }
  try {
    const updatedFaculty = await faculty.findOne({ email: email });
    //hashing password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    updatedFaculty.password = hashedPassword;
    await updatedFaculty.save();
    if (updatedFaculty.updatepassword === false) {
      updatedFaculty.updatepassword = true;
      await updatedFaculty.save();
    }
    return res.status(200).json({
      success: true,
      message: "password updated successfully",
      response: updatedFaculty,
    });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};

export const updateFaculty = async (req, res, next) => {
  try {
    const { name, department, avatar, dob, contactNumber, email, designation } =
      req.body;
    const updatedFaculty = await faculty.findOne({ email: email });
    if (name) {
      updateFaculty.name = name;
      await updateFaculty.save();
    }
    if (department) {
      updateFaculty.department = department;
      await updateFaculty.save();
    }
    if (avatar) {
      updateFaculty.avatar = avatar;
      await updateFaculty.save();
    }
    if (dob) {
      updateFaculty.dob = dob;
      await updateFaculty.save();
    }
    if (contactNumber) {
      updateFaculty.contactNumber = contactNumber;
      await updateFaculty.save();
    }
    if (email) {
      updateFaculty.email = email;
      await updateFaculty.save();
    }
    if (designation) {
      updateFaculty.designation = designation;
      await updateFaculty.save();
    }
    res.status(200).json(updateFaculty);
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
//faculty creating test

export const createTest = async (req, res, io) => {
  try {
    const { subjectCode, department, year, section, date, test, totalMarks } =
      req.body;
    const existingTest = await Test.findOne({
      subjectCode,
      department,
      year,
      section,
      test,
    });
    const errors = { testError: String };

    if (existingTest) {
      errors.testError = "test already exists";
      return res.status(400).json(errors);
    }
    const newTest = await new Test({
      subjectCode,
      department,
      year,
      section,
      date,
      test,
      totalMarks,
    });

    const students = await Student.find({ department, year, section });
    await newTest.save();

    const subject = await Subject.findOne({ subjectCode });
    io.to(`subject:${subject._id}`).emit("new-test", {
      testId: newTest._id,
      title: newTest.test,
      subjectId: subject._id,
    });

    return res.status(200).json({
      success: true,
      message: "test added successfully",
      response: newTest,
    });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
//getting tests of faculty
export const getTest = (req, res, next) => {
  try {
    const { department, year, section } = req.body;
    const tests = Test.find({ department, year, section });
    res.status(200).json({ result: tests });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
//get students

export const getStudent = async (req, res, next) => {
  try {
    const { department, year, section } = req.body;
    const students = await Student.find({ department, year, section });
    const errors = { noStudentError: String };
    if (students.length === 0) {
      errors.noStudentError = "no student found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: students });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
//upload marks
export const uploadMarks = async (req, res, next) => {
  try {
    const { department, year, section, test, marks } = req.body;
    const errors = { examError: String };
    const existingTest = await Test.findOne({ department, year, setion, test });
    const isAlready = await Marks.findOne({
      exam: existingTest._id,
    });
    if (isAlready.length !== 0) {
      errors.examError = "You have already uploaded marks of given exam";
      res.status(400).json(errors);
    }
    for (var i = 0; i < marks.length; i++) {
      const newMarks = await new Marks({
        student: marks[i]._id,
        exam: existingTest._id,
        marks: marks[i].value,
      });
      await newMarks.save();
    }
    res.status(200).json({ message: "Marks uploaded successfully" });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
//mark attendence
export const markAttendance = async (req, res, next) => {
  try {
    const { selectedStudents, subjectName, department, year, section } =
      req.body;
    //get sub
    const sub = await Subject.findOne({ subjectName });
    const allStudents = await Student.find({ department, year, section });
    //adding the lectures for every student
    for (let i = 0; i < allStudents.length; i++) {
      const pre = await attendance.findOne({
        student: allStudents[i]._id,
        subject: sub._id,
      });
      if (!pre) {
        const newAttendance = await new attendance({
          student: allStudents[i]._id,
          subject: sub._id,
        });
        newAttendance.totalLecturesByFaculty += 1;
        await newAttendance.save();
      } else {
        pre.totalLecturesByFaculty += 1;
        await pre.save();
      }
    }

    for (let a = 0; a < selectedStudents.length; a++) {
      const pre = await attendance.findOne({
        student: selectedStudents[a],
        subject: sub._id,
      });
      if (!pre) {
        const newAttendance = await new attendance({
          student: selectedStudents[a],
          subject: sub._id,
        });
        newAttendance.lectureAttended += 1;
        await newAttendance.save();
      } else {
        pre.lectureAttended += 1;
        await pre.save();
      }
    }
    res.status(200).json({ message: "Attendance Marked successfully" });
  } catch (error) {
    const errors = { backendError: String };
    error.backendError = error;
    return res.status(500).json(error);
  }
};
