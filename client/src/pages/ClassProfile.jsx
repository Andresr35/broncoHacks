import PropTypes from "prop-types";
import { useState } from "react";
import styles from "../assets/ClassProfile.module.css";
import Like from "../assets/svg/Like";
import Comment from "../assets/svg/Comment";
import Post from "../components/Post";

const ClassProfile = ({ url }) => {
  const [classProfile, setClassProfile] = useState({
    name: "ECE 3301",
    description:
      "This is a description of the 3301 class. It does this and that.",
    professor: "Professor name",
    meeting_location: "Bldg 8 Rm 4",
    meeting_time: "7:00pm - 8:15pm",
    posts: [
      {
        author: "name",
        timestamp: "timestamp",
        message: "This is a test message for a post",
        title: "Test Post",
        likes: [],
        comments: {
          message: "",
          timestamp: "",
          author: "",
        },
      },
    ],
  });
  const [active, setActive] = useState("posts");
  return (
    <main className={styles.classProfile}>
      <h2>{classProfile.name}</h2>
      <p className={styles.description}>{classProfile.description}</p>
      <div className={styles.classInfo}>
        <p>{classProfile.professor}</p>
        <p>{classProfile.meeting_time}</p>
        <p>{classProfile.meeting_location}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.classNav}>
          <div
            onClick={() => setActive("students")}
            className={active == "students" ? styles.active : ""}
          >
            Students
          </div>
          <div
            onClick={() => setActive("posts")}
            className={active == "posts" ? styles.active : ""}
          >
            Posts
          </div>
          <div
            onClick={() => setActive("events")}
            className={active == "events" ? styles.active : ""}
          >
            Events
          </div>
        </div>
        {active == "posts"
          ? classProfile.posts.map((post, index) => (
              <Post post={post} key={index} url={url} setNewPost={() => {}} />
            ))
          : null}
      </div>
    </main>
  );
};

ClassProfile.propTypes = {};

export default ClassProfile;
