/**
 * This page will just handle putting a post on the page
 *
 */

import PropTypes from "prop-types";
import styles from "../assets/Post.module.css";
import { useState } from "react";
// import Comment from "./Comment";
import { Link, useNavigate } from "react-router-dom";
import Like from "../assets/svg/Like";
import Comment from "../assets/svg/Comment";

const Post = ({ post, setNewPost, url }) => {
  const navigate = useNavigate();
  const [addCommentError, setAddCommentError] = useState("");
  const [handleLikeError, setHandleLikeError] = useState("");
  const [deletePostError, setDeletePostError] = useState("");
  const [openComments, setOpenComments] = useState(false);
  const handleComment = () => setOpenComments(!openComments);

  const addComment = async (e) => {
    e.preventDefault();
    // const addCommentRes = await fetch(`${url}/api/posts/${post._id}/comments`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   },
    //   body: JSON.stringify({
    //     message: e.target.comment.value,
    //     userID: localStorage.getItem("userID"),
    //   }),
    // });
    // if (addCommentRes.status == 401) return navigate("/login");
    // const addCommentData = await addCommentRes.json();
    // if (addCommentData.status == 201) setNewPost(addCommentData.newPost);
    // else setAddCommentError(addCommentData.message);
    // e.target.reset();
  };

  const deletePost = async (e) => {
    e.preventDefault();
    // const deletePostRes = await fetch(`${url}/api/posts/${post._id}`, {
    //   method: "DELETE",
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //   },
    // });
    // if (deletePostRes.status == 401) return navigate("/login");
    // const deletePostData = await deletePostRes.json();
    // if (deletePostData.status == 200) setNewPost({});
    // else setDeletePostError(deletePostData.message);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    // const likeRes = await fetch(`${url}/api/posts/${post._id}/likes`, {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     userID: localStorage.getItem("userID"),
    //   }),
    // });
    // if (likeRes.status == 401) return navigate("/login");
    // const likeData = await likeRes.json();
    // if (likeData.status == 200) setNewPost(likeData.newPost);
    // else setHandleLikeError(likeData.message);
  };

  return (
    <div className={styles.post}>
      <h4>{post.title}</h4>
      <p className={styles.message}>{post.message}</p>
      <div className={styles.postData}>
        <div>
          <div className={styles.like}>{post.likes.length} likes</div>
          <button onClick={handleLike} className={styles.icon}>
            <Like />
          </button>
          <button className={styles.icon} onClick={handleComment}>
            <Comment />
          </button>
          {/* {authenticated && (
            <>
              {!deletePostError.length == 0 && <p>{deletePostError}</p>}

              <button className={styles.icon} onClick={deletePost}>
                <img src="/delete.svg" alt="Delete post" />
              </button>
            </>
          )} */}
        </div>
        <div>
          <p className={styles.timestamp}>{post.date}</p>
          {/* <Link to={post.author.url} className={styles.author}> */}
          <Link to={post.author.url}>{post.author.name}</Link>
          {/* <img
              style={{ width: "50px", borderRadius: "100%" }}
              src={post.author.picture}
              alt="user Picture"
            /> */}
          {/* </Link> */}
        </div>
      </div>

      {!handleLikeError.length == 0 && <p>{handleLikeError}</p>}

      {/* {openComments && (
        <div className={styles.commentsContainer}>
          {post.comments.map((comment, index) => (
            <Comment
              comment={comment}
              key={index}
              setPost={setNewPost}
              url={url}
            />
          ))}
          <form className={styles.addComment} onSubmit={addComment}>
            {!addCommentError.length == 0 && <p>{addCommentError}</p>}
            <input type="text" name="comment" placeholder="Add Comment" />
            <button className={styles.icon} type="submit">
              <img src="/send.svg" alt="Add comment Button" />
            </button>
          </form>
        </div>
      )} */}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  setNewPost: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
};

export default Post;
