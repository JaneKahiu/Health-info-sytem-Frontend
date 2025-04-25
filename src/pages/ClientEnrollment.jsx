import { useState, useEffect } from 'react';
import axios from '../api/axios';

const ClientEnrollment = () => {
  const [clientData, setClientData] = useState({
    full_name: '',
    email: '',
    age: '',
    gender: '',
    program_ids: [], // Changed to array for multiple selections
  });

  const [programs, setPrograms] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch programs from backend to populate the checkboxes
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

  // Handle checkbox changes for program selection
  const handleProgramChange = (programId) => {
    const updatedProgramIds = [...clientData.program_ids];
    
    // If program is already selected, remove it; otherwise add it
    const index = updatedProgramIds.indexOf(programId);
    if (index > -1) {
      updatedProgramIds.splice(index, 1);
    } else {
      updatedProgramIds.push(programId);
    }
    
    setClientData({
      ...clientData,
      program_ids: updatedProgramIds,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('api/clients/', clientData);
      setSuccessMessage('Client enrolled successfully!');
      setClientData({ 
        full_name: '', 
        email: '', 
        age: '', 
        gender: '', 
        program_ids: [] 
      }); // Clear form
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
            required
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
            required
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
            required
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
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Health Programs</label>
          <div className="space-y-2 border border-gray-300 rounded p-3">
            {programs.map((program) => (
              <div key={program.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`program-${program.id}`}
                  checked={clientData.program_ids.includes(program.id)}
                  onChange={() => handleProgramChange(program.id)}
                  className="mr-2"
                />
                <label htmlFor={`program-${program.id}`}>{program.name}</label>
              </div>
            ))}
            {programs.length === 0 && (
              <p className="text-gray-500">No programs available</p>
            )}
          </div>
        </div>

        {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}

        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={clientData.program_ids.length === 0}
        >
          Enroll Client
        </button>
      </form>
    </div>
  );
};

export default ClientEnrollment;