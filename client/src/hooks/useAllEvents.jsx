import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useAllEvents = (url) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${url}/api/event`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (res.status == 200) {
        const data = await res.json();
        setEvents(data.events);
      } else if (res.status == 401) {
        navigate("/login");
      }
    };
    fetchClubs();
  }, []);
  return { events, setEvents };
};

export default useAllEvents;
