const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question text is required"],
    },
    options: {
      type: [String],
      required: [true, "Options are required"],
      validate: {
        validator: function (options) {
          return options.length >= 2;
        },
        message: "At least two options are required",
      },
    },
    correctAnswer: {
      type: String,
      required: [true, "Correct answer is required"],
      validate: {
        validator: function (value) {
          return this.options.includes(value);
        },
        message: "Correct answer must be one of the options",
      },
    },
  },
  { timestamps: true }
);

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
