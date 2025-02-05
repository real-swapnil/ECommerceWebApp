import React, { useEffect, useState } from "react";
import ProductListing from "./ProductListing";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToggleButton, CssBaseline } from "@mui/material";
import Stack from "@mui/material/Stack";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useMediaQuery } from "react-responsive";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc"; // Google logo icon
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import DiamondIcon from "@mui/icons-material/Diamond";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MaleIcon from "@mui/icons-material/Male";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function AppBarLabel({ label, color }) {
  return (
    <Toolbar>
      <IconButton edge="start" color={color} aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}
// Function to create themes dynamically
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      ...(mode === "light"
        ? { primary: { main: "#1976d2" } } // Light theme primary color
        : { primary: { main: "#121212" } }), // Dark theme background
    },
  });

function Home() {
  const [products, setProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [themeMode, setThemeMode] = useState("light"); // Default theme mode

  // Function to toggle theme mode
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = getTheme(themeMode);

  useEffect(() => {
    async function getProducts() {
      try {
        const resp = await fetch("https://fakestoreapi.com/products");
        const data = await resp.json();
        setProducts(data); // Save data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getProducts();
  }, []); // Runs only once when the component mounts

  console.log(products); // Logs correctly after data is fetched

  //==================================================================For drawer (to call catagory )

  useEffect(() => {
    async function getCatagory() {
      try {
        const resp = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await resp.json();
        setCatagory(data); // Save data to state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    getCatagory();
  }, []);
  console.log(catagory);

  const isMobile = useMediaQuery({ maxWidth: 600 });
  const login = useGoogleLogin({
    onSuccess: (response) => console.log("Login Success:", response),
    onError: () => console.log("Login Failed"),
  });

  //-----------------------------------------------Search region -----------------------------

  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Filter products based on search input
  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // console.log(filteredProducts);

  //-----------------------------------------------Drawer Section-----

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (itemText) => {
    setSelectedItem(itemText); // Update state with clicked item
    console.log("Clicked item:", itemText);
  };

  const filteredProducts = products
    .filter((product) =>
      selectedItem ? product.category === selectedItem : true
    )
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  console.log(filteredProducts);

  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <Typography
        variant="h5"
        sx={{ textAlign: "center", width: "100%", mt: 2 }}
      >
        Categories
      </Typography>
      <List>
        {catagory.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleItemClick(text)}>
              <ListItemIcon>
                {index % 2 === 0 ? <MaleIcon /> : <DiamondIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const [user, setUser] = useState(null);

  const handleSuccess = (response) => {
    console.log("Login Success:", response);
    setUser(response); // Save user info
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures proper theme colors apply */}
          <Stack spacing={2} sx={{ flexGrow: 1 }}>
            {/* Navbar */}
            <AppBar position="static" color="primary">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    display: { xs: "none", sm: "block" },
                    cursor: "pointer",
                  }}
                  onClick={() => window.location.reload()}
                >
                  {themeMode === "light" ? "Light Mode" : "Dark Mode"}
                </Typography>
                <Search sx={{}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Search>
                {/* Google Loing authenticator */}
                <GoogleOAuthProvider
                  clientId={
                    "1004612977020-o9ifsdaigs6s3i3cu67kcs7fp4l2iua0.apps.googleusercontent.com"
                  }
                  redirectUri="http://localhost:5173/"
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "10px",
                    }}
                  >
                    {isMobile ? (
                      // Custom Google Icon Button
                      <button
                        onClick={login}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          border: "none",
                          background: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                          cursor: "pointer",
                        }}
                      >
                        <FcGoogle size={25} /> {/* Google Icon */}
                      </button>
                    ) : // Full Google Login Button
                    user ? (
                      <h2>Welcome, User! 🎉</h2> // Replace with actual user info if needed
                    ) : (
                      <GoogleLogin
                        onSuccess={(credentialResponse) =>
                          handleSuccess(credentialResponse)
                        }
                        onError={() => console.log("Login Failed")}
                      />
                    )}
                  </div>
                </GoogleOAuthProvider>
                {/* Toggle Button for Theme Switching */}
                <ToggleButton
                  value="themeToggle"
                  selected={themeMode === "dark"}
                  onChange={toggleTheme}
                  sx={{ color: "white" }}
                >
                  {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </ToggleButton>
              </Toolbar>
            </AppBar>
          </Stack>
        </ThemeProvider>
      </Box>

      <ProductListing products={products} fiterP={filteredProducts} />
    </>
  );
}

export default Home;
// FilterOnCatagory={selectedItem}

// const CategoryFilteredProducts = products.filter((item) =>
//   selectedItem ? item.category === selectedCategory : true
// );
// console.log(CategoryFilteredProducts);
