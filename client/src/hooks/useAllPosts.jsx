import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useAllPosts = (url) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${url}/api/posts`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setPosts(data.posts);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchClubs();
  }, []);
  return { posts, setPosts };
};

export default useAllPosts;
