import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useAllClubs = (url) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${url}/api/clubs`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setClubs(data.clubs);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchClubs();
  }, []);
  return { clubs, setClubs };
};

export default useAllClubs;
