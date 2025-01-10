import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedExams = storage.getExams();
    setExams(storage.getExams());
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Student Dashboard</h1>
      <h1 className="text-1xl font-bold mb-6">Available Exams</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {exams.map((exam) => (
          <div key={exam.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{exam.title}</h2>
            <p className="text-gray-600 mb-4">{exam.description}</p>
            <button
              onClick={() => navigate(`/exam/${exam.id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;