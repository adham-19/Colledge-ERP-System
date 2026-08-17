import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        "Invalid email format",
      ],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  gender: {
    type: String,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
  },
  dob: {
    type: Date,
    required: true,
  },
  joiningYear: {
    type: Number,
    required: true,
  },
  passwordUpdated: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
    default: null,
  },

  resetPasswordExpires: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("faculty", facultySchema);
