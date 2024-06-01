import React from 'react'
import JobTable from '../components/JobTable/JobTable'
import ProfileHeader from '../components/ProfileHeader/ProfileHeader'
import { PlaceRounded } from '@mui/icons-material'
const Profile = () => {
  console.log("profile");
  return (
    <>
        <ProfileHeader/>
        <JobTable/>
    </>
  )
}

export default Profile

