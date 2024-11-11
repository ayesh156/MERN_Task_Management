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
import Sidebar from "../components/Home/Sidebar";
import {useState} from "react";
import {Stack, Button, useMediaQuery} from "@mui/material";
import {Outlet, useLocation} from "react-router-dom";

const drawerWidth = 240;
const smallScreenDrawerWidth = 50;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, isSmallScreen  }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: `${open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0}px)`,

    })
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        [theme.breakpoints.down('sm')]: {
            width: `calc(100% - ${smallScreenDrawerWidth}px)`,
            marginLeft: `${smallScreenDrawerWidth}px`,
        },
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Home() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [Data, setData] = useState();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();  // Use location hook to get current path

    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);
    const userData = (data) => setData(data);

    // Function to get title based on route name
    const getAppBarTitle = () => {
        switch (location.pathname) {
            case '/importantTasks':
                return 'Important Tasks';
            case '/completedTasks':
                return 'Completed Tasks';
            case '/incompletedTasks':
                return 'Incompleted Tasks';
            default:
                return 'All Tasks';
        }
    };

    return (
        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {getAppBarTitle()} {/* Dynamically set AppBar title based on route */}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? (isSmallScreen ? smallScreenDrawerWidth : drawerWidth) : 0,
                        boxSizing: 'border-box',
                        backgroundColor: '#34495e',
                        overflowX: 'hidden', // Hide horizontal scroll bar in Drawer
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    {Data && (
                        <Stack alignItems="flex-start" width="100%">
                            {!isSmallScreen && (
                                <>
                                    <h2 className="text-xl text-white font-semibold">{Data.username}</h2>
                                    <h4 className="mb-1 text-gray-300">{Data.email}</h4>
                                </>
                            )}
                        </Stack>
                    )}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={{ color: "white" }} /> : <ChevronRightIcon sx={{ color: "white" }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Sidebar userData={userData} showText={!isSmallScreen} />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>
        </Box>
    );
}
