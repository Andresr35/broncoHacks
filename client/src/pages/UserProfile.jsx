import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { useState } from "react";
import styles from "../assets/UserProfile.module.css";
import Post from "../components/Post";
import Star from "../assets/svg/Star";
import Member from "../components/Member";
import useUserClubs from "../hooks/useUserClubs";
import { useParams } from "react-router-dom";
import Event from "../components/Event";
import useUserPosts from "../hooks/useUserPosts";
import useUser from "../hooks/useUser";
const UserProfile = ({ url }) => {
  const { userID } = useParams();
  const [active, setActive] = useState("posts");
  // const [user, setUser] = useState({
  //   name: "Jessie Reyes",
  //   age: 21,
  //   gender: "male",
  //   bio: "This is a small bio. I like turtles and such.",
  //   friendRequests: [],
  //   friends: [],
  //   ratings: 0,
  //   tags: [],
  //   picture: "/path/to/your/image.jpg",
  //   _id: "65be193ee3fc2e348ddd9b2b",
  //   __v: 0,
  //   url: "/profile/65be193ee3fc2e348ddd9b2b",
  //   id: "65be193ee3fc2e348ddd9b2b",
  // });
  // const [userPosts, setUserPosts] = useState({
  //   name: "ECE 3301",
  //   description:
  //     "This is a description of the 3301 class. It does this and that.",
  //   professor: "Professor name",
  //   meeting_location: "Bldg 8 Rm 4",
  //   meeting_time: "7:00pm - 8:15pm",
  //   posts: [
  //     {
  //       author: "name",
  //       timestamp: "timestamp",
  //       message: "This is a test message for a post",
  //       title: "Test Post",
  //       likes: [],
  //       comments: {
  //         message: "",
  //         timestamp: "",
  //         author: "",
  //       },
  //     },
  //     {
  //       author: "name",
  //       timestamp: "timestamp",
  //       message: "This is a test message for a post",
  //       title: "Test Post",
  //       likes: [],
  //       comments: {
  //         message: "",
  //         timestamp: "",
  //         author: "",
  //       },
  //     },
  //     {
  //       author: "name",
  //       timestamp: "timestamp",
  //       message: "This is a test message for a post",
  //       title: "Test Post",
  //       likes: [],
  //       comments: {
  //         message: "",
  //         timestamp: "",
  //         author: "",
  //       },
  //     },
  //   ],
  // });
  const { user } = useUser(url, userID);
  const { userPosts } = useUserPosts(url, userID);
  const { userClubs } = useUserClubs(url, userID);
  console.log(userPosts);
  return (
    <main className={styles.userProfile}>
      <div className={styles.profilePic}></div>
      <h1 className={styles.h1}>{user.name}</h1>
      <p className={styles.bio}>{user.bio}</p>
      <p className={styles.userData}>
        {user.age} | {user.gender} | {user.ratings} <Star />
      </p>
      <div className={styles.container}>
        <div className={styles.classNav}>
          <div
            onClick={() => setActive("friends")}
            className={active == "friends" ? styles.active : ""}
          >
            Friends
          </div>
          <div
            onClick={() => setActive("posts")}
            className={active == "posts" ? styles.active : ""}
          >
            Posts
          </div>
          <div
            onClick={() => setActive("school")}
            className={active == "school" ? styles.active : ""}
          >
            School
          </div>
        </div>
        {active == "posts"
          ? userPosts.map((post, index) => (
              <Post post={post} key={index} url={url} setNewPost={() => {}} />
            ))
          : null}
        {active == "friends"
          ? user.friends.map((member, index) => (
              <Member member={member} key={index} url={url} />
            ))
          : null}
        {active == "school"
          ? userClubs.map((event, index) => (
              <Event event={event} key={index} url={url} />
            ))
          : null}
      </div>
      <Navbar />
    </main>
  );
};

UserProfile.propTypes = {};

export default UserProfile;
