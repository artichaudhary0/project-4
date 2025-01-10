import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

function ExamPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const examData = storage.getExamById(examId);
    setExam(examData);
  }, [examId]);

  const handleSubmit = () => {
    setSubmitting(true);
    const score = exam.questions.reduce((total, question) => {
      return total + (answers[question.id] === question.correct_answer ? 1 : 0);
    }, 0);

    const percentageScore = (score / exam.questions.length) * 100;
    const passed = percentageScore >= 50;

    const resultData = {
      exam_id: examId,
      exam_title: exam.title,
      user_name: 'Admin',
      user_email: 'admin@example.com',
      answers,
      score: percentageScore,
      passed,
      date: new Date().toISOString(),
    };

    storage.saveExamResult(resultData);
    setResult(resultData);
    setSubmitting(false);
  };

  if (!exam) {
    return <div>Loading exam...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">{exam.title}</h1>
      <p className="mb-8">{exam.description}</p>
      <div className="space-y-8">
        {exam.questions.map((question, index) => (
          <div key={question.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">
              Question {index + 1}: {question.question_text}
            </h2>
            <div className="mt-4 space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                    className="form-radio"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        disabled={submitting || Object.keys(answers).length !== exam.questions.length}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {submitting ? 'Submitting...' : 'Submit Exam'}
      </button>

      {result && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center animate-fade-in"
        >
          <div
            className="bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 rounded-xl shadow-2xl relative max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold mb-4 text-center">Exam Result</h2>
            <p className="text-lg text-center">
              <span className="font-semibold">Score:</span> {result.score}%
            </p>
            <p
              className={`text-xl font-semibold mt-4 text-center ${
                result.passed ? 'text-green-300' : 'text-red-300'
              }`}
            >
              {result.passed ? 'Congratulations, You Passed!' : 'Sorry, You Failed.'}
            </p>
            <button
              onClick={() => navigate('/student')}
              className="mt-6 bg-white text-blue-600 font-bold px-4 py-2 rounded-lg w-full hover:bg-gray-100"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExamPage;
