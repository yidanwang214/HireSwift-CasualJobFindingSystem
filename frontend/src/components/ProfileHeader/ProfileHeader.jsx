import React from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
} from "@mui/material";
import { Favorite, WorkOutline, AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";

const ProfileHeader = () => {
    const user = useSelector((state)=>state.user.userInfo)
  return (
    <Box color="primary" sx={{ padding: "30px", height: "120px" }}>
      <Toolbar
        sx={{ justifyContent: "flex-start", alignItems: "center", gap: "20px" }}
      >
        <Avatar sx={{ width: 56, height: 56 }} src="" />
        <div>
          <Typography variant="h6">{user.name} </Typography>
          <Typography variant="subtitle1">Data Analyst</Typography>
        </div>
      </Toolbar>
    </Box>
  );
};

export default ProfileHeader;
