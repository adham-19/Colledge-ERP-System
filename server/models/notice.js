import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  noticeFor: {
    type: String,
    required: true,
  },
});

export default mongoose.model("notice", noticeSchema);