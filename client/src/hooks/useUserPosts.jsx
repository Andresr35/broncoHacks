import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useUserPosts = (url, userID, includeFriends = false) => {
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `${url}/api/users/${userID}/posts?includeFriends=${includeFriends}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      if (res.status == 200) {
        const data = await res.json();
        setUserPosts(data.posts);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchUsers();
  }, []);

  return { userPosts, setUserPosts };
};

export default useUserPosts;
