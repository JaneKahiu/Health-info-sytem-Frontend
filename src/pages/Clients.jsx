import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Clients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
        setFilteredClients(response.data); 
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Filter clients when search term changes
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(client => 
        client.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.age.toString().includes(searchTerm) ||
        client.gender.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

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
        email: 'placeholder@example.com', 
        enrolled_program: null, 
      });

      // Add new client to the list
      setClients([...clients, response.data]);
      setNewClient({ name: '', age: '', gender: '' });
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const viewClientProfile = (clientId) => {
    navigate(`/clients/${clientId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Clients</h1>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center border rounded overflow-hidden">
          <input 
            type="text" 
            placeholder="Search clients by name, email, age, or gender..." 
            className="w-full p-3 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button 
              onClick={clearSearch}
              className="bg-gray-200 hover:bg-gray-300 px-4 h-full flex items-center"
            >
              ✕
            </button>
          )}
          <button 
            className="bg-blue-500 text-white p-3"
          >
            Search
          </button>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">
          {searchTerm ? 'Search Results' : 'Enrolled Clients'}
          {searchTerm && ` (${filteredClients.length})`}
        </h2>

        {filteredClients.length === 0 ? (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded">
            {searchTerm ? 'No clients match your search.' : 'No clients registered yet.'}
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredClients.map((client) => (
              <li key={client.id} className="bg-gray-100 p-4 rounded shadow hover:shadow-md transition">
                <h3 className="text-lg font-bold">{client.full_name}</h3>
                <p className="text-gray-700">
                  Email: {client.email} | Age: {client.age} | Gender: {client.gender}
                </p>
                <div className="mt-2">
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-sm"
                    onClick={() => viewClientProfile(client.id)}
                  >
                    View Profile
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Clients;