// src/App.js
import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Space } from 'antd';
import UserCard from './components/UserCard';
import './App.css';

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
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // This function is passed down to UserCard to handle deletions.
  const handleDeleteUser = (userId) => {
    setUsers(currentUsers => currentUsers.filter(user => user.id !== userId));
  };

  // This function is passed down to UserCard (and then to the Modal) to handle updates.
  const handleUpdateUser = (updatedUser) => {
    setUsers(currentUsers =>
      currentUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  if (loading) {
    return (
      <div className="spinner-container">
        <Space size="middle">
          <Spin size="large" />
        </Space>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        {users.map(user => (
          // Ant Design's grid system for responsiveness
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <UserCard
              user={user}
              onDelete={handleDeleteUser}
              onUpdate={handleUpdateUser}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default App;