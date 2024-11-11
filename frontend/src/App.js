import React, {useEffect} from 'react';
import Home from "./pages/Home";
import AllTasks from "./pages/AllTasks";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/CompletedTasks";
import IncompletedTasks from "./pages/IncompletedTasks";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "./store/auth";
import {Route, Routes, useNavigate} from "react-router-dom";

const App = () => {
    const history = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.getItem("id") && localStorage.getItem("token")) {
            dispatch(authActions.login());
        } else if (isLoggedIn === false) {
            history("/signup");
        }
    }, []);

    return (
        <div className="bg-gray-900 text-white min-h-screen p-2 relative">
            <Routes>
                <Route exact path="/" element={<Home/>}>
                    <Route exact path="/" element={<AllTasks/>}/>
                    <Route exact path="/importantTasks" element={<ImportantTasks/>}/>
                    <Route exact path="/completedTasks" element={<CompletedTasks/>}/>
                    <Route exact path="/incompletedTasks" element={<IncompletedTasks/>}/>
                </Route>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login/>}/>
            </Routes>
        </div>
    )
}

export default App;