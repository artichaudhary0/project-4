const mongoose = require("mongoose");
const Exam = require("./Exam");

const resultSchema = new mongoose.Schema(
  {
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    marksObtained: {
      type: Number,
      required: true,
    },
    pass: {
      type: Boolean,
      default: false,
    },
    totalMarks: {
      type: Number,
    },
  },
  { timestamps: true }
);

// ✅ Pre-save Hook: Fetch totalMarks from Exam and Calculate Pass/Fail
resultSchema.pre("save", async function (next) {
  try {
    const exam = await Exam.findById(this.exam);
    if (!exam) {
      throw new Error("Exam not found!");
    }

    this.totalMarks = exam.totalMarks;
    this.pass = this.marksObtained >= exam.totalMarks * 0.5;
    next();
  } catch (error) {
    next(error);
  }
});

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
