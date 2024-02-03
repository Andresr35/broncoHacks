import PropTypes from "prop-types";
import { useState } from "react";
import styles from "../assets/Home.module.css";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import Event from "../components/Event";
import useUserClubs from "../hooks/useUserClubs";
import useUserPosts from "../hooks/useUserPosts";

const Home = ({ url }) => {
  const [active, setActive] = useState("posts");

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
  const { userClubs } = useUserClubs(url, localStorage.getItem("userID"));
  const { userPosts } = useUserPosts(url, localStorage.getItem("userID"), true);
  return (
    <main>
      <h1 className={styles.h1}>Bronco Life</h1>
      <div className={styles.container}>
        <div className={styles.classNav}>
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
          ? userPosts.map((post, index) => (
              <Post post={post} key={index} url={url} setNewPost={() => {}} />
            ))
          : null}
        {active == "events"
          ? userClubs.map((event, index) => (
              <Event event={event} key={index} url={url} />
            ))
          : null}
      </div>
      <Navbar />
    </main>
  );
};

Home.propTypes = {};

export default Home;
