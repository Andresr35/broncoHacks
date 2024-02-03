import PropTypes from "prop-types";
import styles from "../assets/ClubProfile.module.css";
import { useState } from "react";
import Post from "../components/Post";
import Navbar from "../components/Navbar";
import Event from "../components/Event";

const ClubProfile = ({ url }) => {
  const [clubProfile, setClubProfile] = useState({
    name: "NASA Student Launch",
    description:
      "This is a description of the NSL club. It does this and that.",
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
    members: [],
  });
  const [events, setEvents] = useState([
    {
      name: "Rocket Launch",
      description:
        "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
      picture: "",
      type: {
        Study: 0,
        School: 1,
        Club: 2,
        ASI: 3,
        Personal: 4,
      },
      attendees: [], // List of User Objects
      posts: [],
      meeting_time: " 5am",
      meeting_location: " Friends of Amauetry",
    },
  ]);
  const [active, setActive] = useState("posts");

  return (
    <main className={styles.clubProfile}>
      <h2>{clubProfile.name}</h2>
      <p className={styles.description}>{clubProfile.description}</p>
      <div className={styles.clubInfo}>
        <p>{clubProfile.meeting_time}</p>
        <p>{clubProfile.meeting_location}</p>
      </div>

      <div className={styles.container}>
        <div className={styles.classNav}>
          <div
            onClick={() => setActive("members")}
            className={active == "members" ? styles.active : ""}
          >
            Members
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
          ? clubProfile.posts.map((post, index) => (
              <Post post={post} key={index} url={url} setNewPost={() => {}} />
            ))
          : null}
        {active == "events"
          ? events.map((event, index) => (
              <Event event={event} key={index} url={url} />
            ))
          : null}
      </div>
      <Navbar />
    </main>
  );
};

ClubProfile.propTypes = {};

export default ClubProfile;
