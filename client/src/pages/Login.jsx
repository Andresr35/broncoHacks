import PropTypes from "prop-types";
import styles from "../assets/Login.module.css";
import { useState } from "react";

const Login = ({ url }) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmationPassword: "",
    age: 0,
    gender: "",
    bio: "",
  });

  const authenticate = async (e) => {
    e.preventDefault();
    const logInResults = await fetch(`${url}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
      }),
    });
    const resJson = await logInResults.json();
    if (resJson.status == 200) {
      sessionStorage.setItem("token", resJson.token);
      localStorage.setItem("userID", resJson.user._id);
      navigate("/");
    } else {
      setUser({ ...user, erorr: resJson.message });
      //create error with message
    }
  };

  const signUp = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <h1 className={styles.title}>Bronco Life</h1>
      <div className={styles.tabs}>
        <div
          onClick={() => setLogin(true)}
          className={login ? styles.active + " " + styles.login : styles.login}
        >
          <h3>Log In</h3>
        </div>
        <div
          onClick={() => setLogin(false)}
          className={
            login ? styles.signIn : styles.active + " " + styles.signIn
          }
        >
          <h3>Sign Up</h3>
        </div>
      </div>
      {login && (
        <div className={styles.loginContainer}>
          <h3>Log In</h3>
          <form onSubmit={authenticate}>
            <div className={styles.input}>
              <h4>Email</h4>
              <input
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.input}>
              <h4>Password</h4>
              <input
                type="text"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.button} type="submit">
              Log In
            </button>
          </form>
        </div>
      )}
      {!login && (
        <div className={styles.signInContainer}>
          <h3>Sign Up</h3>
          <form onSubmit={signUp}>
            <div className={styles.input}>
              <h4>Email</h4>
              <input
                type="text"
                placeholder="Enter Email"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <h4>Password</h4>
              <input
                type="password"
                placeholder="Enter Password"
                value={signUpData.password}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, password: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <h4>Confirm Password</h4>
              <input
                type="password"
                placeholder="Confirm Password"
                value={signUpData.confirmPassword}
                onChange={(e) =>
                  setSignUpData({
                    ...signUpData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className={styles.input}>
              <h4>Age</h4>
              <input
                type="number"
                placeholder="Enter Age"
                value={signUpData.age}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, age: e.target.value })
                }
              />
            </div>
            <div className={styles.input}>
              <h4>Gender</h4>
              <select
                name="gender"
                defaultValue="select"
                onChange={(e) =>
                  setSignUpData({ ...signUpData, gender: e.target.value })
                }
              >
                <option value="select" disabled>
                  Select
                </option>
                <option value="male">male</option>
                <option value="female">female</option>
                <option value="other">other</option>
              </select>
            </div>
            <div className={styles.input}>
              <h4>Bio</h4>
              <input
                type="text"
                placeholder="Enter Bio"
                value={signUpData.bio}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, bio: e.target.value })
                }
              />
            </div>
            <button className={styles.button} type="submit">
              Sign Up
            </button>
          </form>
        </div>
      )}
    </main>
  );
};

Login.propTypes = {};

export default Login;
