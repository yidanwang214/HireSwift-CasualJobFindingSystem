import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Button,
  MenuItem,
  Container,
  Divider,
  Avatar,
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

const categorizedList = [
  {
    category: "Business",
    subcategories: [
      { subcategory: "Accounting", id: 1 },
      { subcategory: "Banking & Financial Services", id: 4 },
      { subcategory: "Human Resources & Recruitment", id: 17 },
    ],
  },
  {
    category: "Creative Media",
    subcategories: [
      { subcategory: "Advertising, Arts & Media", id: 3 },
      { subcategory: "Design & Architecture", id: 10 },
    ],
  },
  {
    category: "Education Training",
    subcategories: [{ subcategory: "Education & Training", id: 11 }],
  },
  {
    category: "Trades",
    subcategories: [
      { subcategory: "Construction", id: 8 },
      { subcategory: "Engineering", id: 12 },
      { subcategory: "Trades & Services", id: 30 },
    ],
  },
  {
    category: "Hospitality Tourism",
    subcategories: [
      { subcategory: "Hospitality & Tourism", id: 16 },
      { subcategory: "Sport & Recreation", id: 29 },
    ],
  },
  {
    category: "Healthcare",
    subcategories: [{ subcategory: "Healthcare & Medical", id: 15 }],
  },
  {
    category: "Technology",
    subcategories: [{ subcategory: "Science & Technology", id: 27 }],
  },
  {
    category: "Public Social Services",
    subcategories: [
      { subcategory: "Community Services & Development", id: 7 },
      { subcategory: "Government & Defence", id: 14 },
    ],
  },
  {
    category: "Resources Energy",
    subcategories: [
      { subcategory: "Farming, Animals & Conservation", id: 13 },
      { subcategory: "Mining, Resources & Energy", id: 23 },
    ],
  },
  {
    category: "Others",
    subcategories: [
      { subcategory: "Self Employment", id: 28 },
      { subcategory: "Others", id: 0 },
    ],
  },
];

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
  const [anchorELAvatar, setAnchorELAvatar] = useState(null);
  const [clickedCategory, setClikedCategory] = useState(null);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.user.accessToken);
  const hasLogin = !!userInfo && !!accessToken;
  const dispatch = useDispatch();
  const openAvatar = Boolean(anchorELAvatar);

  const handleAvatar = (e) => {
    setAnchorELAvatar(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorELAvatar(null);
  };

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
          {hasLogin ? (
            <IconButton color="inherit" onClick={handleAvatar}>
              <Avatar alt="User Name" src="" />
            </IconButton>
          ) : null}
          <Menu
            anchorEl={anchorELAvatar}
            open={openAvatar}
            onClose={handleAvatarClose}
          >
            <MenuItem
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/myjobs");
              }}
            >
              My Jobs
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(logout());
                navigate("/login", { replace: true });
                setAnchorELAvatar(null);
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
        <Divider sx={{ borderBottomWidth: 0.1, borderColor: "lightgray" }} />
        <Toolbar
          disableGutters
          sx={{ justifyContent: "flex-start", minHeight: "40px", mt: -1 }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {categorizedList.map((key) => (
              <Button
                key={key.category}
                onClick={(e) => handleOpenExtraNavMenu(e, "Explore")}
                sx={{
                  my: 2,
                  mx: 1,
                  color: "black",
                  textTransform: "capitalize",
                  fontWeight: 700,
                }}
                aria-haspopup="true"
              >
                {key.category}
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
            onClose={() => {
              setAnchorElExploreMenu(null);
              setAnchorElPremiumMenu(null);
            }}
          >
            {clickedCategory &&
              categorizedList
                .find((category) => category.category === clickedCategory)
                ?.subcategories.map((subcategory) => (
                  <MenuItem
                    key={subcategory.subcategory}
                    onClick={() => {
                      setAnchorElExploreMenu(null);
                      setAnchorElPremiumMenu(null);
                      navigate(`/joblist/?categoryId=${subcategory.id}`);
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography variant="body2">
                        {subcategory.subcategory}
                      </Typography>
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
