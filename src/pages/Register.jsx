import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../utils/localStorage';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      storage.saveUser({
        id: Date.now().toString(),
        email,
        password,
        name,
        role: 'student'
      });
      navigate('/login');
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
              <input
                type="password"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
