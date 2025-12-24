import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
    handleMenuClose();
  };

  const menuItems = (
    <>
      <MenuItem component={Link} to="/" onClick={handleMenuClose}>
        Home
      </MenuItem>

      <MenuItem component={Link} to="/search" onClick={handleMenuClose}>
        Search
      </MenuItem>

      {user?.role === "admin" && (
        <MenuItem
          component={Link}
          to="/admin/movies"
          onClick={handleMenuClose}
        >
          Admin
        </MenuItem>
      )}

      {!user ? (
        <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
          Login
        </MenuItem>
      ) : (
        <MenuItem onClick={handleLogout} sx={{ color: "error.main" }}>
          Logout
        </MenuItem>
      )}
    </>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit"
          }}
        >
          🎬 Movie App
        </Typography>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>

            <Button color="inherit" component={Link} to="/search">
              Search
            </Button>

            {user?.role === "admin" && (
              <Button
                color="inherit"
                component={Link}
                to="/admin/movies"
              >
                Admin
              </Button>
            )}

            {!user ? (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Typography
                  variant="body2"
                  sx={{
                    mr: 2,
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {user.email}
                </Typography>

                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      backgroundColor: "rgba(211,47,47,0.1)",
                      color: "#d32f2f"
                    }
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        )}
        {isMobile && (
          <>
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
            >
              {menuItems}
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
