import PropTypes from "prop-types";
import styles from "../assets/Login.module.css";
import { useState } from "react";

const Login = (props) => {
  const [login, setLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <h3>Sign In</h3>
        </div>
      </div>
      <div className={styles.logInContainer}>
        <h3>Log In</h3>
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
      </div>
    </main>
  );
};

Login.propTypes = {};

export default Login;
