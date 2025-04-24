import { useState, useEffect } from 'react';
import axios from '../api/axios';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    age: '',
    gender: '',
  });

  // Fetch clients from backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('/api/clients/');
        setClients(response.data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.age || !newClient.gender) return;

    try {
      const response = await axios.post('/api/clients/', {
        full_name: newClient.name,
        age: parseInt(newClient.age),
        gender: newClient.gender,
        email: 'placeholder@example.com', // Replace or capture this properly
        enrolled_program: null, // Optional: handle if needed
      });

      // Add new client to the list
      setClients([...clients, response.data]);
      setNewClient({ name: '', age: '', gender: '' });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Clients</h1>

      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Clients</h2>
        {clients.length === 0 ? (
          <p>No clients registered yet.</p>
        ) : (
          <ul className="space-y-4">
            {clients.map((client) => (
              <li key={client.id} className="bg-gray-100 p-4 rounded shadow">
                <h3 className="text-lg font-bold">{client.full_name}</h3>
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
