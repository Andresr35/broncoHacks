import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useUserClubs = (url, userID) => {
  const navigate = useNavigate();
  const [userClubs, setUserClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${url}/api/clubs/${userID}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setUserClubs(data.clubs);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchClubs();
  }, []);
  return { userClubs, setUserClubs };
};

export default useUserClubs;
