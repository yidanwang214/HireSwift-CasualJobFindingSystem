import React, { useState } from "react";
import JobTable from "../components/JobTable/JobTable";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import { PlaceRounded } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Box, Drawer } from "@mui/material";
const Profile = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <ProfileHeader
        user={user}
        onPublishClick={() => {
          setDrawerOpen(true);
        }}
      />
      <JobTable />
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 480 }}>
          {/* Form to create new job */}
        </Box>
      </Drawer>
    </>
  );
};

export default Profile;
