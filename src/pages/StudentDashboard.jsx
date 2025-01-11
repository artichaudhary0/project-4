import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/localStorage';

function StudentDashboard() {
  const [exams, setExams] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [examData, resultData] = await Promise.all([
          storage.getExams(),
          storage.getStudentResults(user._id)
        ]);
        setExams(examData);
        setResults(resultData);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user._id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
        <button
          onClick={() => {
            localStorage.clear();
            navigate('/login');
          }}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Available Exams</h2>
          <div className="space-y-4">
            {exams.map((exam) => (
              <div key={exam._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{exam.title}</h3>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Total Marks: {exam.totalMarks}</p>
                  <p>Start: {new Date(exam.startTime).toLocaleString()}</p>
                  <p>End: {new Date(exam.endTime).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => navigate(`/exam/${exam._id}`)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Start Exam
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Your Results</h2>
          <div className="space-y-4">
            {results.map((result) => (
              <div
                key={result._id}
                className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${
                  result.pass ? 'border-green-500' : 'border-red-500'
                }`}
              >
                <h3 className="text-lg font-semibold mb-2">
                  {result.exam.title}
                </h3>
                <div className="text-sm text-gray-600">
                  <p>Marks Obtained: {result.marksObtained}</p>
                  <p>Total Marks: {result.totalMarks}</p>
                  <p>Status: {result.pass ? 'Passed' : 'Failed'}</p>
                  <p className="text-xs mt-2">
                    Date: {new Date(result.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;