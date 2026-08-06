const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
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
    password: {
      type: String,
      required: true,
      select: false,
    },
    username: {
      type: String,
    },
    department: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    joiningYear: {
      type: Number,
    },
    avatar: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    // For first login (There is a defualt password until he changes it)
    passwordUpdated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
