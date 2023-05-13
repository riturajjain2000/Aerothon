import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import Search from "../../components/Recycler/Search";
import styles from "./RecycleHome.module.css";
import Dashboard from "../../components/Recycler/Dashboard";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

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
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <h1 className={styles.logoText}>
          S U S{" "}
          <span>
            <AirplanemodeActiveIcon color="secondary" sx={{ fontSize: 30 }} />
          </span>{" "}
          A I N
        </h1>
        <h2 className={styles.nameContainer}>
          {props.userData.name ? `Welcome - ${props.userData.name}` : "Airbus"}
        </h2>
        <h2 className={styles.typeContainer}>Recycling facility</h2>
        <button onClick={handleLogout}>Log Out</button>
      </div>

      <div>
        <Dashboard userData={props.userData} />
      </div>
    </div>
  );
}

export default RecycleHome;
