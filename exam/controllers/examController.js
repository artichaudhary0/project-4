const {
    createExam,
    getAllExams,
    getExamById,
    updateExam,
    deleteExam,
  } = require("../services/examService").default;
  

  const createNewExam = async (req, res) => {
    const { title, startTime, endTime, totalMarks, questions } = req.body;
    try {
      const newExam = await createExam({
        title,
        startTime,
        endTime,
        totalMarks,
        questions,
      });
      res.status(201).json({ message: "Exam created successfully", newExam });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const fetchAllExams = async (req, res) => {
    try {
      const exams = await getAllExams();
      res.status(200).json(exams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const fetchExamById = async (req, res) => {
    const { id } = req.params;
    try {
      const exam = await getExamById(id);
      res.status(200).json(exam);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const modifyExam = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedExam = await updateExam(id, req.body);
      res.status(200).json({ message: "Exam updated successfully", updatedExam });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

  const removeExam = async (req, res) => {
    const { id } = req.params;
    try {
      await deleteExam(id);
      res.status(200).json({ message: "Exam deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = {
    createNewExam,
    fetchAllExams,
    fetchExamById,
    modifyExam,
    removeExam,
  };
  