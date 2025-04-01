import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

import dashboardIcon from "../../assets/dashboard4.png";

import { LuLayoutDashboard } from "react-icons/lu";
import { ToastContainer, toast } from 'react-toastify';



import { useNavigate } from 'react-router-dom';
import logo from "../../assets/LandingPageImages/Company-Logo.png";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ setProviderData, fav, setLoading }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


  let debounceTimeout; // Global timeout reference

  const handleSearch = (event) => {
    const keyword = event.target.value;

    // Clear previous timeout to prevent multiple requests
    clearTimeout(debounceTimeout);

    // Set loading state to true when search begins
    if (setLoading) {
      setLoading(true);
    }

    // Set a new timeout (500ms delay)
    debounceTimeout = setTimeout(() => {
      // console.log("Search:", keyword);

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `http://localhost:5000/customer/auth/searchprovider?keyword=${keyword}&fav=${fav || false}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("customerToken")}`,
        },
      };

      async function makeRequest() {
        try {
          const response = await axios.request(config);
          if (response.data.error) {
            toast.error(response.data.error);
          } else {
            setProviderData(response.data.provider);
          }
        } catch (error) {
          console.log(error);
        } finally {
          // Set loading state to false when search completes
          if (setLoading) {
            setLoading(false);
          }
        }
      }

      makeRequest();
    }, 500); // Adjust debounce delay as needed
  };

  const navigate = useNavigate();

  const handleHistory = () => {
    navigate('/customer/dashboard/history');
  }

  const handleGoHome = () => {
    navigate('/');
  }
  const handleFavorites = () => {
    navigate('/customer/dashboard/favorites');
  }
  const handleProfile = () => {
    navigate('/customer/dashboard/profile');
  }
  const handleLogout = () => {
    localStorage.removeItem('customerToken');
    navigate('/', { state: { logout: true } });
  }
  const handleDashboard=()=>{
    navigate('/customer/dashboard');
  }

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      {/* <MenuItem >Edit Profile</MenuItem> */}
      <MenuItem onClick={handleHistory}>History</MenuItem>
      <MenuItem onClick={handleFavorites}>Favorites</MenuItem>
      <MenuItem>Report a Bug</MenuItem>
      <MenuItem onClick={handleLogout} sx={{ color: 'red' }}>LogOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <img src={logo} alt="" className="logo" style={{ height: '3.5rem', cursor: "Pointer" }} onClick={handleGoHome} />
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleSearch}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <LuLayoutDashboard  onClick={handleDashboard} style={{cursor: "Pointer", position: "relative", top: "0.9rem", fontSize: "1.8rem" }}/>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge
                badgeContent={4}
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    top: 10,  // Adjust vertical alignment
                    right: 10.5, // Adjust horizontal alignment
                    fontSize: '0.6rem', // Optional: Adjust text size
                    minWidth: '18px', // Adjust badge width
                    height: '18px', // Adjust badge height
                  },
                }}>
                <MailIcon sx={{ fontSize: 32 }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={10} color="error" sx={{
                '& .MuiBadge-badge': {
                  top: 10,  // Adjust vertical alignment
                  right: 10.5, // Adjust horizontal alignment
                  fontSize: '0.6rem', // Optional: Adjust text size
                  minWidth: '18px', // Adjust badge width
                  height: '18px', // Adjust badge height
                },
              }}>
                <NotificationsIcon sx={{ fontSize: 32 }} />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle sx={{ fontSize: 32 }} />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
