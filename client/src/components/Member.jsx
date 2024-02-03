import PropTypes from "prop-types";
import styles from "../assets/Member.module.css";

const Member = ({ member, url }) => {
  return (
    <div className={styles.member}>
      <div className={styles.profilePic}></div>
      <h3>{member.name}</h3>
    </div>
  );
};

Member.propTypes = {};

export default Member;
