import PropTypes from "prop-types";
import styles from "../assets/Event.module.css";
const Event = ({ url, event }) => {
  return (
    <div className={styles.event}>
      <h4>{event.name}</h4>
      <p className={styles.description}>{event.description}</p>
      <div className={styles.eventData}>
        <div>
          <p className={styles.timestamp}>{event.meeting_time}</p>
          <div>{event.meeting_location}</div>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object,
  url: PropTypes.string.isRequired,
};
export default Event;
