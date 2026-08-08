const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
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
    userName: {
      type: String,
    },
    // TODO: Convert to Ref
    department: {
      type: String,
      required: true,
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

adminSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const adminModel = mongoose.model("admin", adminSchema);
module.exports = adminModel;
