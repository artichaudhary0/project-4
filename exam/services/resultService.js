import { create, find, findByIdAndDelete } from "../models/Result";

const createResult = async (resultData) => {
  try {
    return await create(resultData);
  } catch (error) {
    throw new Error("Error creating result: " + error.message);
  }
};

const getAllResults = async () => {
  try {
    return await find().populate("exam student");
  } catch (error) {
    throw new Error("Error fetching results: " + error.message);
  }
};

const getResultByStudent = async (studentId) => {
  try {
    return await find({ student: studentId }).populate("exam");
  } catch (error) {
    throw new Error("Error fetching student's results: " + error.message);
  }
};

const deleteResult = async (id) => {
  try {
    const deletedResult = await findByIdAndDelete(id);
    if (!deletedResult) throw new Error("Result not found");
    return deletedResult;
  } catch (error) {
    throw new Error("Error deleting result: " + error.message);
  }
};

export default {
  createResult,
  getAllResults,
  getResultByStudent,
  deleteResult,
};
