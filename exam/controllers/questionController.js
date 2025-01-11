const {
  createQuestion,
  getAllQuestions,
  getQuestionsByTitle,
  updateQuestion,
  deleteQuestion,
} = require("../services/questionService").default;

const createNewQuestion = async (req, res) => {
  const { title, options, correctAnswer } = req.body;
  try {
    const question = await createQuestion({
      title,
      options,
      correctAnswer,
    });
    res
      .status(201)
      .json({ message: "Question created successfully!", question });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllQuestions = async (req, res) => {
  try {
    const questions = await getAllQuestions();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchQuestionsByTitle = async (req, res) => {
  const { title } = req.params;
  try {
    const questions = await getQuestionsByTitle(title);
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const modifyQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedQuestion = await updateQuestion(id, req.body);
    res
      .status(200)
      .json({ message: "Question updated successfully!", updatedQuestion });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const removeQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteQuestion(id);
    res.status(200).json({ message: "Question deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewQuestion,
  fetchAllQuestions,
  fetchQuestionsByTitle,
  modifyQuestion,
  removeQuestion,
};
