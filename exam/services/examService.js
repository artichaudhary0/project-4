import { create, find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/Exam";


const createExam = async (examData) => {
  try {
    return await create(examData);
  } catch (error) {
    throw new Error("Error creating exam: " + error.message);
  }
};


const getAllExams = async () => {
  try {
    return await find().populate("questions");
  } catch (error) {
    throw new Error("Error fetching exams: " + error.message);
  }
};


const getExamById = async (id) => {
  try {
    return await findById(id).populate("questions");
  } catch (error) {
    throw new Error("Error fetching exam: " + error.message);
  }
};


const updateExam = async (id, updateData) => {
  try {
    const updatedExam = await findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedExam) throw new Error("Exam not found!");
    return updatedExam;
  } catch (error) {
    throw new Error("Error updating exam: " + error.message);
  }
};


const deleteExam = async (id) => {
  try {
    const deletedExam = await findByIdAndDelete(id);
    if (!deletedExam) throw new Error("Exam not found!");
    return deletedExam;
  } catch (error) {
    throw new Error("Error deleting exam: " + error.message);
  }
};

export default {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
};
