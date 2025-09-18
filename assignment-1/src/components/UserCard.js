// src/components/UserCard.js
import React, { useState } from 'react';
// Import Ant Design Icons
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HeartOutlined,
  HeartFilled, // For the filled heart when liked
  EditOutlined,
  DeleteFilled,
} from '@ant-design/icons';

const UserCard = ({ user, onDelete }) => {
  const [liked, setLiked] = useState(false);

  // New, correct URL
const avatarUrl = `https://api.dicebear.com/8.x/avataaars/svg?seed=${user.username}`;

  const handleLike = () => {
    setLiked(!liked);
  };

  // For Assignment 1, edit/delete will just log to console or trigger a simple alert
  // if you want full functionality, Assignment 1 essentially becomes Assignment 2 with Bootstrap.
  const handleEditClick = () => {
    alert(`Editing user: ${user.name}`);
    console.log(`Edit clicked for user ID: ${user.id}`);
    // In a full implementation (like Assignment 2), this would open an edit modal
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4"> {/* Bootstrap grid classes */}
      <div className="card h-100 shadow-sm"> {/* Bootstrap card styling */}
        <div className="card-header bg-light text-center p-3">
          {/* Avatar using the specified API endpoint */}
          <img
            src={avatarUrl}
            alt={`${user.name}'s avatar`}
            className="rounded-circle border border-secondary p-1" // Bootstrap styling for round avatar
            style={{ width: '120px', height: '120px' }}
          />
        </div>
        <div className="card-body text-center">
          <h5 className="card-title fw-bold mb-3">{user.name}</h5> {/* Bootstrap text styling */}
          <p className="card-text text-muted mb-2">
            <MailOutlined style={{ marginRight: '8px' }} />
            <a href={`mailto:${user.email}`} className="text-decoration-none text-dark">
              {user.email}
            </a>
          </p>
          <p className="card-text text-muted mb-2">
            <PhoneOutlined style={{ marginRight: '8px' }} />
            <a href={`tel:${user.phone.split(' ')[0]}`} className="text-decoration-none text-dark"> {/* Basic phone link */}
              {user.phone}
            </a>
          </p>
          <p className="card-text text-muted mb-2">
            <GlobalOutlined style={{ marginRight: '8px' }} />
            <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
              {user.website}
            </a>
          </p>
        </div>
        <div className="card-footer d-flex justify-content-around bg-white border-top"> {/* Footer for actions */}
          <button className="btn btn-link text-danger p-0" onClick={handleLike} title="Like">
            {liked ? <HeartFilled style={{ fontSize: '20px' }} /> : <HeartOutlined style={{ fontSize: '20px' }} />}
          </button>
          <button className="btn btn-link text-primary p-0" onClick={handleEditClick} title="Edit">
            <EditOutlined style={{ fontSize: '20px' }} />
          </button>
          <button className="btn btn-link text-danger p-0" onClick={() => onDelete(user.id)} title="Delete">
            <DeleteFilled style={{ fontSize: '20px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;