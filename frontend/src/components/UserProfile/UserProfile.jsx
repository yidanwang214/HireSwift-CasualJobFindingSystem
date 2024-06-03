import React, { useState } from 'react';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import EditableInfoCard from '../EditableInfoCard/EditableInfoCard';
import RatingHistory from '../RatingHistory/RatingHistory';

const UserProfile = () => {
  const user = {
    name: 'Phoenix X.',
    location: 'Adelaide, Australia',
    localTime: '2:45 pm',
    introduction: 'An experienced web designer with a passion for creating visually appealing and user-friendly websites. Skilled in Ajax, React, and various other web technologies. Dedicated to delivering high-quality work and ensuring client satisfaction.',
    title: 'Expert Web Designer with Ajax experience',
    hourlyRate: '70.00',
    languages: [
      { language: 'English', proficiency: 'Fluent' },
    ],
    licenses: [],
    education: [],
    ratings: []
  };

  for (let i = 1; i <= 10; i++) {
    user.ratings.push({
      employer: `Company ${i}`,
      jobTitle: `Job Title ${i}`,
      rating: (Math.random() * 4 + 1).toFixed(1),
      comment: `This is a longer comment for job ${i}, highlighting the excellent work done and the positive feedback from the employer. The project was completed successfully with great attention to detail and efficiency.`,
      profilePic: 'https://via.placeholder.com/50'
    });
  }

  const [userInfo, setUserInfo] = useState(user);

  const updateUserInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfileHeader user={userInfo} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="md:col-span-3">
          <EditableInfoCard
            title="Introduction"
            value={userInfo.introduction}
            onSave={(value) => updateUserInfo('introduction', value)}
          >
            <textarea
              value={userInfo.introduction}
              onChange={(e) => updateUserInfo('introduction', e.target.value)}
              className="border p-2 rounded w-full mt-2"
              maxLength={100}
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Title"
            value={userInfo.title}
            onSave={(value) => updateUserInfo('title', value)}
          >
            <textarea
              value={userInfo.title}
              onChange={(e) => updateUserInfo('title', e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div>
          <EditableInfoCard
            title="Hourly Rate"
            value={`$${userInfo.hourlyRate}/hr`}
            onSave={(value) => updateUserInfo('hourlyRate', value.replace(/[^0-9]/g, ''))}
          />
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Location"
            value={userInfo.location}
            onSave={(value) => updateUserInfo('location', value)}
          />
        </div>
        <div>
          <EditableInfoCard
            title="Languages"
            value={userInfo.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
            onSave={() => { /* Handle save */ }}
          >
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {userInfo.languages.map((lang, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const newLanguages = [...userInfo.languages];
                      newLanguages[index].language = e.target.value;
                      updateUserInfo('languages', newLanguages);
                    }}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newLanguages = [...userInfo.languages];
                      newLanguages[index].proficiency = e.target.value;
                      updateUserInfo('languages', newLanguages);
                    }}
                    className="border p-2 rounded w-full mt-2"
                  />
                </div>
              ))}
            </div>
          </EditableInfoCard>
        </div>
      </div>
      <RatingHistory ratings={userInfo.ratings} />
    </div>
  );
};

export default UserProfile;
