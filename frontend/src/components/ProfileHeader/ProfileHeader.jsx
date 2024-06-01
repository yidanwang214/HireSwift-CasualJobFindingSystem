import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  Button,
} from "@mui/material";

const ProfileHeader = ({ user, onPublishClick }) => {
  return (
    <Box color="primary" sx={{ padding: "30px", height: "120px" }}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ width: 56, height: 56 }} src="" />
          <div style={{ marginLeft: "16px" }}>
            <Typography variant="h6">{user.name} </Typography>
            <Typography variant="subtitle1">{user.role}</Typography>
          </div>
        </div>
        {user.role === "employer" ? <Button onClick={onPublishClick}>Publish New Job</Button> : ""}
      </Toolbar>
    </Box>
  );
};

export default ProfileHeader;
