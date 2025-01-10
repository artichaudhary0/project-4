import { useState, useEffect } from 'react';
import { Plus, Minus, PlusCircle, Trash2, Edit } from 'lucide-react';
import { storage } from '../utils/localStorage';

function AdminDashboard() {
  const [exams, setExams] = useState([]);
  const [examResults, setExamResults] = useState([]);

  const [newExam, setNewExam] = useState({
    title: '',
    description: '',
    questions: []
  });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({
    question_text: '',
    options: ['', ''],  // Start with 2 empty options
    correct_answer: ''
  });
  const [editMode, setEditMode] = useState(false); // State for editing
  const [editingExam, setEditingExam] = useState(null); // Exam being edited

  useEffect(() => {
    
    setExams(storage.getExams());
    // setExamResults(storage.getAllExamResults());
  }, []);

  const handleCreateExam = (e) => {
    e.preventDefault();
    const savedExam = storage.saveExam(newExam);
    setExams([...exams, savedExam]);
    setNewExam({ title: '', description: '', questions: [] });
  };

  const updateExam = (updatedExam) => {
    const exams = storage.getExams();
    console.log("Before update:", exams);
    
    const updatedExams = exams.map((exam) =>
      exam.id === updatedExam.id ? updatedExam : exam
    );
    console.log("After update:", updatedExams);
  
    localStorage.setItem('exams', JSON.stringify(updatedExams));
  }
  

  const handleDeleteExam = (examId) => {
    if (window.confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
      storage.deleteExam(examId);
      setExams(exams.filter(exam => exam.id !== examId));
    }
  };

  const handleEditExam = (examId) => {
    const examToEdit = exams.find((exam) => exam.id === examId);
    setEditingExam(examToEdit);
    setNewExam({ ...examToEdit }); // Include `id` in the copied exam
    setEditMode(true);
  };

  const handleSaveExam = (e) => {
    e.preventDefault();
    storage.updateExam(newExam);
    const updatedExams = exams.map((exam) =>
      exam.id === newExam.id ? newExam : exam
    );
    console.log("Updated exams in state:", updatedExams);
    setExams(updatedExams); // Update state
  };
   

  const handleAddQuestion = () => {
    if (currentQuestion.options.some(opt => !opt.trim())) {
      alert('Please fill in all options before adding the question');
      return;
    }
    if (!currentQuestion.correct_answer) {
      alert('Please select a correct answer');
      return;
    }

    setNewExam({
      ...newExam,
      questions: [...newExam.questions, { ...currentQuestion, id: Date.now().toString() }]
    });
    setCurrentQuestion({
      question_text: '',
      options: ['', ''],
      correct_answer: ''
    });
    setShowQuestionForm(false);
  };

  const addOption = () => {
    setCurrentQuestion({
      ...currentQuestion,
      options: [...currentQuestion.options, '']
    });
  };

  const removeOption = (indexToRemove) => {
    if (currentQuestion.options.length <= 2) {
      alert('A question must have at least 2 options');
      return;
    }

    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.filter((_, index) => index !== indexToRemove),
      correct_answer: currentQuestion.correct_answer === currentQuestion.options[indexToRemove]
        ? ''
        : currentQuestion.correct_answer
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Create/Update Exam Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editMode ? 'Edit Exam' : 'Create New Exam'}</h2>
        <form onSubmit={editMode ? handleSaveExam : handleCreateExam} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
              <input
                type="text"
                value={newExam.title}
                onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
              <textarea
                value={newExam.description}
                onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                rows="3"
              />
            </label>
          </div>

          {/* Questions List */}
          <div className="space-y-2">
            {newExam.questions.map((q, index) => (
              <div key={q.id} className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Question {index + 1}: {q.question_text}</p>
                <div className="mt-2 pl-4">
                  {q.options.map((option, optIndex) => (
                    <p key={optIndex} className={`text-sm ${option === q.correct_answer ? 'text-green-600 font-medium' : 'text-gray-600'}`}>
                      {String.fromCharCode(65 + optIndex)}. {option}
                      {option === q.correct_answer && ' (Correct)'}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Add Question Form */}
          {showQuestionForm && (
            <div className="border p-6 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-4">Add Question</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Question text"
                  value={currentQuestion.question_text}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    question_text: e.target.value
                  })}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                />

                <div className="space-y-2">
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <span className="w-6 text-gray-500">{String.fromCharCode(65 + index)}.</span>
                      <input
                        type="text"
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[index] = e.target.value;
                          setCurrentQuestion({
                            ...currentQuestion,
                            options: newOptions
                          });
                        }}
                        className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="p-2 text-red-500 hover:text-red-700"
                        title="Remove option"
                      >
                        <Minus size={20} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addOption}
                  className="flex items-center space-x-2 text-blue-500 hover:text-blue-700"
                >
                  <Plus size={20} />
                  <span>Add Option</span>
                </button>

                <select
                  value={currentQuestion.correct_answer}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    correct_answer: e.target.value
                  })}
                  className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select correct answer</option>
                  {currentQuestion.options.map((option, index) => (
                    option && <option key={index} value={option}>
                      {String.fromCharCode(65 + index)}. {option}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                  Add Question
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setShowQuestionForm(true)}
              className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              <PlusCircle size={20} />
              <span>Add New Question</span>
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={newExam.questions.length === 0}
            >
              {editMode ? 'Save Changes' : 'Create Exam'}
            </button>
          </div>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Existing Exams</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{exam.title}</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditExam(exam.id)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                  title="Edit exam"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteExam(exam.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete exam"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{exam.description}</p>
            <p className="text-sm text-gray-500">
              {exam.questions?.length || 0} questions
            </p>
          </div>
        ))}
      </div>
      <h2 className="text-xl font-semibold mt-8 mb-4">Exam Results</h2>
      <div className="space-y-4">
        {examResults.map((result) => (
          <div key={result.exam_id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{result.exam_title}</h3>
            <p className="text-gray-600">Student: {result.user_name} ({result.user_email})</p>
            <p className="text-gray-600">Score: {result.score}%</p>
            <p className={result.passed ? 'text-green-600' : 'text-red-600'}>
              {result.passed ? 'Passed' : 'Failed'}
            </p>
            <p className="text-gray-500 text-sm">Date: {new Date(result.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
