import React from 'react';
import profile_pic from '../../assets/profile-pic.png';

const UserProfileHeader = ({ user }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img src={profile_pic} alt="Profile" className="w-20 h-20 rounded-full" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.location} - {user.localTime} local time</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
