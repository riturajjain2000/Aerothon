import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function RecycleHome(props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log(props);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div>
        <h1>
          <Link to="/login">Login</Link>
        </h1>
        <br />
        <h1>
          <Link to="/signup">Signup</Link>
        </h1>
      </div>

      <br />
      <br />
      <br />

      <h2>
        {props.userData.name ? `Welcome - ${props.userData.name}` : "NAME"}
      </h2>
      <h2>Recycling facility</h2>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default RecycleHome;
