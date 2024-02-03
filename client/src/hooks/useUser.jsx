import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useUserClubs = (url, userID) => {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${url}/api/users/${userID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setUser(data.user);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchClubs();
  }, []);
  return { user, setUser };
};

export default useUserClubs;
