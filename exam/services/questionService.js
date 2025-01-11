import { create, find, findByIdAndUpdate, findByIdAndDelete } from "../models/Question";

const createQuestion = async (data) => {
  try {
    return await create(data);
  } catch (error) {
    throw new Error("Error creating question: " + error.message);
  }
};

const getAllQuestions = async () => {
  try {
    return await find();
  } catch (error) {
    throw new Error("Error fetching questions: " + error.message);
  }
};

const getQuestionsByTitle = async (title) => {
  try {
    return await find({ title });
  } catch (error) {
    throw new Error("Error fetching questions for the title: " + error.message);
  }
};

const updateQuestion = async (id, data) => {
  try {
    const updatedQuestion = await findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedQuestion) throw new Error("Question not found!");
    return updatedQuestion;
  } catch (error) {
    throw new Error("Error updating question: " + error.message);
  }
};

const deleteQuestion = async (id) => {
  try {
    const deletedQuestion = await findByIdAndDelete(id);
    if (!deletedQuestion) throw new Error("Question not found!");
    return deletedQuestion;
  } catch (error) {
    throw new Error("Error deleting question: " + error.message);
  }
};

export default {
  createQuestion,
  getAllQuestions,
  getQuestionsByTitle,
  updateQuestion,
  deleteQuestion,
};
