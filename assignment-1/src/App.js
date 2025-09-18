// src/App.js
import React, { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css'; // Your custom CSS if any, or just for centering content

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // Optionally, handle error state for display
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle deleting a user
  const handleDeleteUser = (userId) => {
    // Filter out the user with the given ID
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
  };

  return (
    <div className="App">
      <div className="container mt-5"> {/* Bootstrap container for centering and spacing */}
        <h1 className="text-center mb-4">User Profiles</h1>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="row justify-content-center"> {/* Bootstrap row for grid layout */}
            {users.map(user => (
              <UserCard
                key={user.id}
                user={user}
                onDelete={handleDeleteUser} // Pass the delete handler
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;