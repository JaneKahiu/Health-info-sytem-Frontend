import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/clients/${id}/`);
        console.log('Client data received:', response.data); // For debugging
        setClient(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching client data:', err);
        setError('Failed to load client profile. Please try again.');
        setLoading(false);
      }
    };

    fetchClientData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p className="mt-2">Loading client profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative my-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded relative my-4" role="alert">
        <strong className="font-bold">Not found!</strong>
        <span className="block sm:inline"> Client profile not found.</span>
      </div>
    );
  }

  // Determine which property contains the enrolled programs
  // This handles different possible API response formats
  const enrolledPrograms = client.enrolled_program || client.enrolled_programs || [];

  return (
    <div className="container mx-auto p-4">
      <button 
        onClick={() => navigate('/clients')}
        className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
      >
        <span className="mr-1">←</span> Back to Clients
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold">{client.full_name}</h1>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-medium">{client.email}</p>
                </div>
                <div>
                  <p className="text-gray-600">Age</p>
                  <p className="font-medium">{client.age}</p>
                </div>
                <div>
                  <p className="text-gray-600">Gender</p>
                  <p className="font-medium">{client.gender}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Enrolled Programs</h2>
              {Array.isArray(enrolledPrograms) && enrolledPrograms.length > 0 ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-3">
                    {enrolledPrograms.map((program) => (
                      <li key={program.id} className="border-b pb-2 last:border-b-0 last:pb-0">
                        <p className="font-medium">{program.name}</p>
                        {program.description && (
                          <p className="text-sm text-gray-600">{program.description}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-gray-500 italic">Not enrolled in any programs</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;