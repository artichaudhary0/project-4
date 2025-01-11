const {
  createResult,
  getAllResults,
  getResultByStudent,
  deleteResult,
} = require("../services/resultService").default;

const createNewResult = async (req, res) => {
  const { exam, student, marksObtained } = req.body;

  try {
    const result = await createResult({
      exam,
      student,
      marksObtained,
    });
    res.status(201).json({ message: "Result created successfully!", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchAllResults = async (req, res) => {
  try {
    const results = await getAllResults();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchResultByStudent = async (req, res) => {
  const { studentId } = req.params;
  try {
    const result = await getResultByStudent(studentId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeResult = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteResult(id);
    res.status(200).json({ message: "Result deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createNewResult,
  fetchAllResults,
  fetchResultByStudent,
  removeResult,
};
