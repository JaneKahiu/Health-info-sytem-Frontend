import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ClientEnrollment = () => {
  const [clientData, setClientData] = useState({
    full_name: '',
    email: '',
    age: '',
    gender: '',
    enrolled_program: '', 
  });

  const [programs, setPrograms] = useState([]); // State to store programs
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch programs from backend to populate the dropdown
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('api/healthprograms/'); 
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };
    fetchPrograms();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('api/clients/', clientData);
      setSuccessMessage('Client enrolled successfully!');
      setClientData({ full_name: '', email: '', age: '', gender: '', enrolled_program: '' }); // Clear form
      console.log('Client created:', response.data);
    } catch (error) {
      setErrorMessage('Failed to enroll client. Please try again.');
      console.error('Error:', error.response || error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Enroll New Client</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="full_name" className="block">Full Name</label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={clientData.full_name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={clientData.email}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={clientData.age}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block">Gender</label>
          <select
            id="gender"
            name="gender"
            value={clientData.gender}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="enrolled_program" className="block">Enrolled Program</label>
          <select
            id="enrolled_program"
            name="enrolled_program"
            value={clientData.enrolled_program}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Program</option>
            {programs.map((program) => (
              <option key={program.id} value={program.id}>
                {program.name}
              </option>
            ))}
          </select>
        </div>

        {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Enroll Client
        </button>
      </form>
    </div>
  );
};

export default ClientEnrollment;
