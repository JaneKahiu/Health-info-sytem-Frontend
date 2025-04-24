import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const ProfileSettings = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    email: "",
    username: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/auth/users/me/");
        setProfile({
          email: response.data.email,
          username: response.data.username,
        });
      } catch (err) {
        setError("Failed to fetch profile data. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/auth/users/me/", { username: profile.username });
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">{error}</div>;

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Profile Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full p-2 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        <div>
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {success && <div className="text-green-600 text-sm">{success}</div>}
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSettings;
