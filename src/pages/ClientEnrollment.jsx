import  { useState } from 'react';

const ClientEnrollment = () => {
  const [clientData, setClientData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData({
      ...clientData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form to backend (you can use an API service here)
    console.log(clientData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Enroll New Client</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={clientData.name}
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Enroll Client</button>
      </form>
    </div>
  );
}

export default ClientEnrollment;
