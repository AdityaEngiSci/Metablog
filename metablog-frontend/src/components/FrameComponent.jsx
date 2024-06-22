import PropTypes from "prop-types";
import styles from "./FrameComponent.module.css";

const FrameComponent = ({ className = "" }) => {
  return (
    <div className={[styles.backgroundParent, className].join(" ")}>
      <img className={styles.backgroundIcon} alt="" src="/background.svg" />
      <div className={styles.logoParent}>
        <img
          className={styles.logoIcon}
          loading="lazy"
          alt=""
          src="/logo.svg"
        />
        <h1 className={styles.blogsToDive}>Blogs to dive into tech</h1>
      </div>
    </div>
  );
};

FrameComponent.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent;
