// src/components/UserCard.js
import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
import {
  EditOutlined,
  DeleteFilled,
  HeartOutlined,
  HeartFilled,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from '@ant-design/icons';
import EditUserModal from './EditUserModal';

const { Meta } = Card;

const UserCard = ({ user, onDelete, onUpdate }) => {
  const [liked, setLiked] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // New, correct URL
const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`;
  const showEditModal = () => {
    setIsModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const handleUserUpdate = (updatedUser) => {
    onUpdate(updatedUser);
    setIsModalVisible(false); // Close modal after successful update
  };

  return (
    <>
      <Card
        style={{ margin: '15px', borderRadius: '8px', overflow: 'hidden' }}
        cover={
          <div style={{ backgroundColor: '#f5f5f5', display: 'flex', justifyContent: 'center', padding: '24px' }}>
            <Avatar src={avatarUrl} style={{ width: '150px', height: '150px' }} />
          </div>
        }
        actions={[
          liked ? (
            <HeartFilled key="like" onClick={() => setLiked(!liked)} style={{ color: 'red', fontSize: '18px' }} />
          ) : (
            <HeartOutlined key="like" onClick={() => setLiked(!liked)} style={{ color: 'red', fontSize: '18px' }} />
          ),
          <EditOutlined key="edit" onClick={showEditModal} style={{ fontSize: '18px' }} />,
          <DeleteFilled key="delete" onClick={() => onDelete(user.id)} style={{ fontSize: '18px' }} />,
        ]}
      >
        <Meta
          title={<h3 style={{ margin: 0 }}>{user.name}</h3>}
          description={
            <div>
              <p style={{ margin: '5px 0' }}><MailOutlined style={{ marginRight: '10px' }} />{user.email}</p>
              <p style={{ margin: '5px 0' }}><PhoneOutlined style={{ marginRight: '10px' }} />{user.phone}</p>
              <p style={{ margin: '5px 0' }}><GlobalOutlined style={{ marginRight: '10px' }} />{`http://${user.website}`}</p>
            </div>
          }
        />
      </Card>
      <EditUserModal
        user={user}
        visible={isModalVisible}
        onEdit={handleUserUpdate}
        onCancel={handleModalCancel}
      />
    </>
  );
};

export default UserCard;