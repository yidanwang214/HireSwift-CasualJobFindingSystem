import React, { useState } from 'react';
import UserProfileHeader from '../UserProfileHeader/UserProfileHeader';
import EditableInfoCard from '../EditableInfoCard/EditableInfoCard';
import RatingHistory from '../RatingHistory/RatingHistory';

const EmployerProfile = () => {
  const employer = {
    name: 'Phoenix Enterprises',
    location: 'Adelaide, Australia',
    localTime: '2:45 pm',
    introduction: 'We are a leading company in web development, providing top-notch services for over 10 years. Our team is dedicated to delivering high-quality projects on time and within budget.',
    companySize: '50-100 employees',
    industry: 'Information Technology',
    languages: [
      { language: 'English', proficiency: 'Fluent' },
    ],
    ratings: []
  };

  for (let i = 1; i <= 10; i++) {
    employer.ratings.push({
      employer: `Freelancer ${i}`,
      jobTitle: `Project ${i}`,
      rating: (Math.random() * 4 + 1).toFixed(1),
      comment: `This is a longer comment for project ${i}, highlighting the excellent collaboration and the positive feedback from the freelancers. The project was completed successfully with great attention to detail and efficiency.`,
      profilePic: 'https://via.placeholder.com/50'
    });
  }

  const [employerInfo, setEmployerInfo] = useState(employer);

  const updateEmployerInfo = (field, value) => {
    setEmployerInfo({ ...employerInfo, [field]: value });
  };

  return (
    <div className="container mx-auto p-4">
      <UserProfileHeader user={employerInfo} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="md:col-span-3">
          <EditableInfoCard
            title="Introduction"
            value={employerInfo.introduction}
            onSave={(value) => updateEmployerInfo('introduction', value)}
          >
            <textarea
              value={employerInfo.introduction}
              onChange={(e) => updateEmployerInfo('introduction', e.target.value)}
              className="border p-2 rounded w-full mt-2"
              maxLength={100}
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Company Size"
            value={employerInfo.companySize}
            onSave={(value) => updateEmployerInfo('companySize', value)}
          >
            <input
              type="text"
              value={employerInfo.companySize}
              onChange={(e) => updateEmployerInfo('companySize', e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Industry"
            value={employerInfo.industry}
            onSave={(value) => updateEmployerInfo('industry', value)}
          >
            <input
              type="text"
              value={employerInfo.industry}
              onChange={(e) => updateEmployerInfo('industry', e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-2">
          <EditableInfoCard
            title="Location"
            value={employerInfo.location}
            onSave={(value) => updateEmployerInfo('location', value)}
          >
            <input
              type="text"
              value={employerInfo.location}
              onChange={(e) => updateEmployerInfo('location', e.target.value)}
              className="border p-2 rounded w-full mt-2"
            />
          </EditableInfoCard>
        </div>
        <div className="md:col-span-1">
          <EditableInfoCard
            title="Languages"
            value={employerInfo.languages.map(lang => `${lang.language} (${lang.proficiency})`).join(', ')}
            onSave={() => { /* Handle save */ }}
          >
            <div style={{ maxHeight: '100px', overflowY: 'auto' }}>
              {employerInfo.languages.map((lang, index) => (
                <div key={index} className="mt-2">
                  <input
                    type="text"
                    value={lang.language}
                    onChange={(e) => {
                      const newLanguages = [...employerInfo.languages];
                      newLanguages[index].language = e.target.value;
                      updateEmployerInfo('languages', newLanguages);
                    }}
                    className="border p-2 rounded w-full"
                  />
                  <input
                    type="text"
                    value={lang.proficiency}
                    onChange={(e) => {
                      const newLanguages = [...employerInfo.languages];
                      newLanguages[index].proficiency = e.target.value;
                      updateEmployerInfo('languages', newLanguages);
                    }}
                    className="border p-2 rounded w-full mt-2"
                  />
                </div>
              ))}
            </div>
          </EditableInfoCard>
        </div>
      </div>
      <RatingHistory ratings={employerInfo.ratings} />
    </div>
  );
};

export default EmployerProfile;
