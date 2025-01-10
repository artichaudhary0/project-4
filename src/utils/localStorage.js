// Mock data
const initialExams = [
  {
    id: '1',
    title: 'Mathematics Test',
    description: 'Basic algebra and arithmetic',
    questions: [
      {
        id: '1',
        question_text: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correct_answer: '4'
      },
      {
        id: '2',
        question_text: 'What is 5 × 5?',
        options: ['20', '25', '30', '35'],
        correct_answer: '25'
      }
    ]
  }
];

export const storage = {
  getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
    
  },
  
  saveUser(user) {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },

  login(email, password) {
    const users = this.getUsers();
    return users.find(user => user.email === email && user.password === password);
  },

  getExams() {
    let exams = JSON.parse(localStorage.getItem('exams'));
    if (!exams) {
      localStorage.setItem('exams', JSON.stringify(initialExams));
      exams = initialExams;
    }
    return exams;
  },

  saveExam(exam) {
    const exams = this.getExams();
    exam.id = Date.now().toString();
    exams.push(exam);
    localStorage.setItem('exams', JSON.stringify(exams));
    return exam;
  },

  getExamById(id) {
    const exams = this.getExams();
    return exams.find(exam => exam.id === id);
  },

  saveExamResult(result) {
    const results = JSON.parse(localStorage.getItem('examResults')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    results.push({
      ...result,
      user: {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
      },
    });

    localStorage.setItem('examResults', JSON.stringify(results));
  }, 

  deleteExam(id) {
    const exams = this.getExams();

    const updatedExams = exams.filter(exam => exam.id !== id);
    localStorage.setItem('exams', JSON.stringify(updatedExams));
  },

  updateExam(updatedExam) {
    const exams = this.getExams(); 
    const updatedExams = exams.map((exam) =>
      exam.id === updatedExam.id ? updatedExam : exam
    ); 
    localStorage.setItem('exams', JSON.stringify(updatedExams)); 
  },
  
};