import React, { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  Tooltip,
  MenuItem,
  Container,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo-black.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/userSlice";

//Data to be collected from backend
const pages = ["Find talent", "Find job", "Why HireSwift", "Enterprise"];
const explore = [
  { title: "Discover", content: "Inspiring projects made on our platform" },
  { title: "Community", content: "Connect with our team and community" },
  { title: "Guides", content: "In-depth guides covering business topics" },
  { title: "Podcast", content: "Inside tips from top business minds" },
  { title: "Learn", content: "Professional online courses, led by experts" },
  { title: "Blog", content: "New, information and community stories" },
  { title: "Logo Maker", content: "Create your logo instantly" },
  { title: "Workspace", content: "One place to manage your business" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElExploreMenu, setAnchorElExploreMenu] = useState(null);
  const [anchorElPremiumMenu, setAnchorElPremiumMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.user.accessToken);
  const hasLogin = !!userInfo && !!accessToken;
  const dispatch = useDispatch();

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenExtraNavMenu = (event, page) => {
    if (page === "Explore") {
      setAnchorElExploreMenu(event.currentTarget);
    } else if (page === "Get Premium") {
      setAnchorElPremiumMenu(event.currentTarget);
    }
    setClikedCategory(event.currentTarget.firstChild.textContent);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseExtraNavMenu = () => {
    setAnchorElExploreMenu(null);
    setAnchorElPremiumMenu(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/joblist/?search=${searchQuery}`);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "white", color: "black", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", minHeight: "48px" }}
        >
          <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{ height: 40, mr: 2 }}
          />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            HireSwift
          </Typography>
          <form onSubmit={handleSubmit}>
            <Search>
              <SearchIconWrapper>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for any service"
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearchInput}
                value={searchQuery}
              />
            </Search>
          </form>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(e) => handleOpenExtraNavMenu(e, page)}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "black",
                  textTransform: "capitalize",
                }}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{
                my: 2,
                mx: 1,
                color: "black",
                textTransform: "capitalize",
              }}
              onClick={() => {
                if (hasLogin) {
                  dispatch(logout());
                  navigate("/login", { replace: true });
                } else {
                  navigate("/login");
                }
              }}
            >
              {hasLogin ? "Logout" : "Login"}
            </Button>

            {!hasLogin && (
              <Button
                component={Link}
                to="/signup"
                variant="contained"
                sx={{
                  my: 2,
                  mx: 1,
                  color: "white",
                  backgroundColor: "#2196f3", // Lighter blue color
                  textTransform: "capitalize",
                  ":hover": {
                    backgroundColor: "deepskyblue",
                  },
                }}
              >
                Join
              </Button>
            )}
          </Box>
        </Toolbar>
        <Divider sx={{ borderBottomWidth: 0.1, borderColor: "lightgray" }} />
        <Toolbar
          disableGutters
          sx={{ justifyContent: "flex-start", minHeight: "40px", mt: -1 }}
        >
          <Box
            sx={{ width: "70%", display: "flex", justifyContent: "flex-start" }}
          >
            {explore.map((item) => (
              <Button
                key={item.title}
                onClick={(e) => handleOpenExtraNavMenu(e, "Explore")}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "black",
                  textTransform: "capitalize",
                }}
                aria-haspopup="true"
              >
                {item.title}
              </Button>
            ))}
          </Box>
          <Menu
            id="explore-menu"
            anchorEl={anchorElExploreMenu}
            open={Boolean(anchorElExploreMenu)}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            onClose={handleCloseExtraNavMenu}
          >
            {explore.map((item) => (
              <MenuItem key={item.title} onClick={handleCloseExtraNavMenu}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="body1" fontWeight={700}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.content}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
