import  { useState } from 'react';

const HealthPrograms = () => {
  const [programs, setPrograms] = useState([
    { id: 1, name: 'Diabetes Management', description: 'Support program for diabetic patients' },
    { id: 2, name: 'Antenatal Care', description: 'Care for pregnant women' },
  ]);

  const [newProgram, setNewProgram] = useState({ name: '', description: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({ ...newProgram, [name]: value });
  };

  const handleAddProgram = (e) => {
    e.preventDefault();
    if (newProgram.name.trim() === '') return;

    const newEntry = {
      id: Date.now(),
      name: newProgram.name,
      description: newProgram.description,
    };

    setPrograms([...programs, newEntry]);
    setNewProgram({ name: '', description: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Health Programs</h1>

      {/* Program Form */}
      <form onSubmit={handleAddProgram} className="bg-white p-6 rounded shadow-md mb-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Program</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">Program Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={newProgram.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="e.g. HIV Awareness"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            id="description"
            value={newProgram.description}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            rows="3"
            placeholder="Brief description of the program"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Program
        </button>
      </form>

      {/* Program List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Existing Programs</h2>
        {programs.length === 0 ? (
          <p>No programs available yet.</p>
        ) : (
          <ul className="space-y-4">
            {programs.map((program) => (
              <li key={program.id} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-bold">{program.name}</h3>
                <p className="text-gray-700">{program.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default HealthPrograms;
