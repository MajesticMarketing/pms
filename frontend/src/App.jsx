import React,{ useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/shared/Layout";
import Projects from "./components/Projects";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register"
import {useSelector} from "react-redux"
import store from "./Redux/store";
import { loadSingleUser } from "./Redux/actions/authAction";


const App=() => {
  const { isAuthenticated } = useSelector((state) => state.user);
 

  useEffect(() => {
    store.dispatch(loadSingleUser());
  }, []);

  // before login
  const authScreen = () =>{
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    )
  };
  // after login
  const appScreen = () => {
    return (
      <Router>
       
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard"  element={<Dashboard />} />
          <Route path="/projects/:id?" element={<Projects />} />
        </Routes>
      </Router>
    )
  };

  //  show either the login screen or the main app based on whether the user is authenticated or not
  return isAuthenticated ? appScreen() : authScreen();
};


export default App;
