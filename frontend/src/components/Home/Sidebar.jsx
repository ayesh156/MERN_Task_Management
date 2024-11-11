import React, {useEffect, useState} from 'react';
import {CgNotes} from "react-icons/cg";
import {MdLabelImportant} from "react-icons/md";
import {FaCheckDouble} from "react-icons/fa6";
import {TbNotebookOff} from "react-icons/tb";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {authActions} from "../../store/auth";
import axios from "axios";
import { useTheme } from '@mui/material/styles';
import {Button, Stack, useMediaQuery} from "@mui/material";
import {FiLogOut} from "react-icons/fi";

const Sidebar = ({userData}) => {
    const theme = useTheme();
    const data = [
        {
            title: "All tasks",
            icon: <CgNotes/>,
            link: "/"
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant/>,
            link: "/importantTasks"
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble/>,
            link: "/completedTasks"
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff/>,
            link: "/incompletedTasks"
        },
    ];

    const location = useLocation();
    const dispatch = useDispatch();
    const history = useNavigate();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [Data, setData] = useState();
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.clear("id");
        localStorage.clear("token");
        history("/signup");
    }

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:3001/api/v2/get-all-tasks",
                {headers}
            );
            setData(response.data.data);
            userData(response.data.data);
        };
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
            fetch();
        }
    }, []);

    return (
            <Stack mx={isSmallScreen ? 0 : 1} height="100vh">
                <Stack
                    spacing={2}
                    mt={2}
                    direction="column"
                    alignItems="center"  // Center items in Stack
                    flexGrow={1} // Takes up all available space, pushing logout button to bottom
                >
                    {data.map((items, i) => (
                        <Link to={items.link} key={i} style={{
                            width: "100%",
                            textDecoration: "none",
                            color: location.pathname === "/customer" ? "primary" : "white",

                        }}>
                        <Button key={i}
                                disableElevation
                                variant={location.pathname === items.link ? "contained" : "contained"}
                                color={location.pathname === items.link ? "primary" : "none"}

                                startIcon={items.icon}
                                sx={{
                                    paddingY: '0.8rem',
                                    width: '100%',  // Make Button full-width within Stack
                                    maxWidth: '300px',  // Optional: limit button width
                                    display: "flex",
                                    justifyContent: "flex-start",  // Center on small screens
                                    color: location.pathname === items.link ? "primary" : "inherit",
                                    "& .MuiButton-startIcon": {
                                        color: "white", // Set the color of the start icon to white
                                    },
                                }}
                        >
                            {isSmallScreen ? "" : items.title}

                        </Button>
                        </Link>


                    ))}
                </Stack>
                <Button color="error" sx={{paddingY: '0.8rem', marginBottom: '1rem'}} variant="contained" onClick={logout}>
                    {isSmallScreen ? <FiLogOut className="text-xl" /> : "Log Out"}
                </Button>
            </Stack>

    )
}

export default Sidebar;