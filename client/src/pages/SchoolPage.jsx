import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "../assets/SchoolPage.module.css";
import Post from "../components/Post";
import Event from "../components/Event";
import useAllEvents from "../hooks/useAllEvents";
import useAllPosts from "../hooks/useAllPosts";
import useAllClubs from "../hooks/useAllClubs";
const SchoolPage = ({ url }) => {
  const [active, setActive] = useState("posts");
  const [home, setHome] = useState({
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
  });
  const { posts } = useAllPosts(url);
  // const [events, setEvents] = useState([
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  // ]);
  const { events } = useAllEvents(url);
  // const [clubs, setClubs] = useState([
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  //   {
  //     name: "Rocket Launch",
  //     description:
  //       "We are going to be launching our first rocket! It is going to be super exciting so do not miss it!",
  //     picture: "",
  //     type: {
  //       Study: 0,
  //       School: 1,
  //       Club: 2,
  //       ASI: 3,
  //       Personal: 4,
  //     },
  //     attendees: [], // List of User Objects
  //     posts: [],
  //     meeting_time: " 5am",
  //     meeting_location: " Friends of Amauetry",
  //   },
  // ]);
  const { clubs } = useAllClubs(url);

  return (
    <main>
      <h1 className={styles.h1}>Bronco School</h1>
      <div className={styles.container}>
        <div className={styles.classNav}>
          <div
            onClick={() => setActive("clubs")}
            className={active == "clubs" ? styles.active : ""}
          >
            Clubs
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
            Study Spots
          </div>
        </div>
        {active == "posts"
          ? posts.map((post, index) => (
              <Post post={post} key={index} url={url} setNewPost={() => {}} />
            ))
          : null}
        {active == "clubs"
          ? clubs.map((club, index) => (
              <Event event={club} key={index} url={url} />
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

SchoolPage.propTypes = {};

export default SchoolPage;
