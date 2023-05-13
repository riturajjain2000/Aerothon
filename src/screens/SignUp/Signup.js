import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import InputControl from "../../components/InputControl/InputControl";
import { auth } from "../../firebase";

import styles from "./Signup.module.css";
import { storeData, fetchData } from "../../util/http";

//radio button
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    type: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  function handleSubmission() {
    if (!values.name || !values.email || !values.pass || !values.type) {
      setErrorMsg("All fields are required*");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user, {
          displayName: values.name,
        });

        const info = { type: values.type, name: values.name };
        const data = await storeData(info, user.uid);
        console.log(data);

        if (values.type == "airlines/aircraft") {
          navigate("/AirlineHome");
        } else {
          navigate("/RecycleHome");
        }
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.logoText}>
          S U S{" "}
          <span>
            <AirplanemodeActiveIcon color="secondary" sx={{ fontSize: 30 }} />
          </span>{" "}
          A I N
        </h1>

        <InputControl
          label="Company Name"
          placeholder="Enter your name"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <InputControl
          label="Email"
          placeholder="Enter email address"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <InputControl
          label="Password"
          placeholder="Enter password"
          onChange={(event) =>
            setValues((prev) => ({ ...prev, pass: event.target.value }))
          }
        />
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="airlines/aircraft"
              control={<Radio />}
              label="Aircraft Manufacturer / Airline"
              onChange={() =>
                setValues((prev) => ({
                  ...prev,
                  type: "airlines/aircraft",
                }))
              }
            />
            <FormControlLabel
              value="recycle"
              control={<Radio />}
              label="Recycling facility"
              onChange={() =>
                setValues((prev) => ({
                  ...prev,
                  type: "Recycling facility",
                }))
              }
            />
          </RadioGroup>
        </FormControl>

        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission} disabled={submitButtonDisabled}>
            Signup
          </button>
          <p>
            Already have an account?
            <span>
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
