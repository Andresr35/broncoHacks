import PropTypes from "prop-types";
import styles from "../assets/Navbar.module.css";
import { Link } from "react-router-dom";
import Home from "../assets/svg/Home";
import Book from "../assets/svg/Book";

const Navbar = (props) => {
  return (
    <nav>
      <Link to={"/"}>
        <Home />
      </Link>
      <Link to={"/school"}>
        <Book />
      </Link>
      <Link to={"/user/123"}>
        <div className={styles.profile}></div>
      </Link>
    </nav>
  );
};

Navbar.propTypes = {};

export default Navbar;
