import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Sidebar from "../components/Home/Sidebar";  // Sidebar component
import { useState } from "react";
import { Stack, useMediaQuery } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";  // Outlet for nested routes and useLocation for current route

// Drawer width constants for responsive design
const drawerWidth = 240;
const smallScreenDrawerWidth = 50;

// Main content styled component with dynamic width based on Drawer state
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, isSmallScreen }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `${open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0}px`, // Adjust width based on Drawer state
    })
);

// AppBar styled component with dynamic width based on Drawer state
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,  // Adjust AppBar width based on Drawer state
        marginLeft: `${drawerWidth}px`,
        [theme.breakpoints.down('sm')]: {  // For small screens, adjust width
            width: `calc(100% - ${smallScreenDrawerWidth}px)`,
            marginLeft: `${smallScreenDrawerWidth}px`,
        },
    }),
}));

// DrawerHeader styled component to align header content within the Drawer
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

// Main Home component
export default function Home() {
    const theme = useTheme();  // Access the theme for responsive design and other theme-based styles
    const [open, setOpen] = useState(false);  // State for controlling Drawer open/close
    const [Data, setData] = useState();  // State for user data to display in Drawer header
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));  // Check if screen size is small (for responsiveness)
    const location = useLocation();  // Get the current location/path

    // Function to open the Drawer
    const handleDrawerOpen = () => setOpen(true);
    // Function to close the Drawer
    const handleDrawerClose = () => setOpen(false);
    // Function to set user data in state
    const userData = (data) => setData(data);

    // Function to dynamically get the AppBar title based on the current route
    const getAppBarTitle = () => {
        switch (location.pathname) {
            case '/importantTasks':
                return 'Important Tasks';
            case '/completedTasks':
                return 'Completed Tasks';
            case '/incompletedTasks':
                return 'Incompleted Tasks';
            default:
                return 'All Tasks';  // Default title for the home route
        }
    };

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
            {/* Baseline CSS for the application (resets some default styles) */}
            <CssBaseline />

            {/* AppBar with dynamic title */}
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    {/* Menu button to open Drawer */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* Title based on current route */}
                    <Typography variant="h6" noWrap component="div">
                        {getAppBarTitle()}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer component for navigation */}
            <Drawer
                sx={{
                    width: open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0,  // Dynamically set width based on Drawer state
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0,
                        boxSizing: 'border-box',
                        backgroundColor: '#34495e',  // Set Drawer background color
                        overflowX: 'hidden',  // Hide horizontal scroll bar
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                {/* Drawer header */}
                <DrawerHeader>
                    {Data && (
                        <Stack alignItems="flex-start" width="100%">
                            {/* Display user info only if screen is not small */}
                            {!isSmallScreen && (
                                <>
                                    <h2 className="text-xl text-white font-semibold">{Data.username}</h2>
                                    <h4 className="mb-1 text-gray-300">{Data.email}</h4>
                                </>
                            )}
                        </Stack>
                    )}
                    {/* Close button for the Drawer */}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "white" }} /> : <ChevronRightIcon sx={{ color: "white" }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/* Sidebar component with user data and conditional display */}
                <Sidebar userData={userData} showText={!isSmallScreen} />
            </Drawer>

            {/* Main content area */}
            <Main open={open}>
                <DrawerHeader />
                {/* Outlet for rendering nested routes */}
                <Outlet />
            </Main>
        </Box>
    );
}
