import { useState } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([
    { id: 1, name: 'Jane Doe', age: 28, gender: 'Female' },
    { id: 2, name: 'John Smith', age: 34, gender: 'Male' },
  ]);

  const [newClient, setNewClient] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.age || !newClient.gender) return;

    const newEntry = {
      id: Date.now(),
      ...newClient,
      age: parseInt(newClient.age),
    };

    setClients([...clients, newEntry]);
    setNewClient({ name: '', age: '', gender: '' });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Clients</h1>

      {/* Client Form */}
      <form onSubmit={handleAddClient} className="bg-white p-6 rounded shadow-md mb-8 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Add New Client</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={newClient.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Client's full name"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block mb-1 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={newClient.age}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Client's age"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="gender" className="block mb-1 font-medium">Gender</label>
          <select
            name="gender"
            value={newClient.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Client
        </button>
      </form>

      {/* Clients List */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Clients</h2>
        {clients.length === 0 ? (
          <p>No clients registered yet.</p>
        ) : (
          <ul className="space-y-4">
            {clients.map((client) => (
              <li key={client.id} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-bold">{client.name}</h3>
                <p className="text-gray-700">Age: {client.age} | Gender: {client.gender}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Clients;
