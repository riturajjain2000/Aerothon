
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AirlineHome from "./screens/Home/AirlineHome";
import RecycleHome from "./screens/Home/RecycleHome";
import Login from "./screens/Login/Login";
import Signup from "./screens/SignUp/Signup";

import { auth } from "./firebase";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    name: "",
    userId: "",
  });

  const [userType, setUserType] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserData(() => ({ name: user.displayName, userId: user.uid }));
      } else setUserData({ name: "", userId: "" });
    });
  }, []);

  return (

    <div className="App">
     
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/AirlineHome"
            element={<AirlineHome userData={userData} />}
          />
          <Route
            path="/RecycleHome"
            element={<RecycleHome userData={userData} />}
          />
        </Routes>
      </Router>
    </div>

    
  );
}

export default App;
