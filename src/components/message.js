import PropTypes from "prop-types";

import { AiFillCloseCircle } from "react-icons/ai";
import { RiCheckboxCircleFill } from "react-icons/ri";

const iconSelector = {
  error: <AiFillCloseCircle className="message-icon" color={"red"} />,
  success: (
    <RiCheckboxCircleFill className="message-icon" color={"green"} />
  ),
};

const classSelector = {
  error: "error-message",
  success: "success-message",
};

export default function Message({ text, icon }) {
  return (
    <div className={`message ${classSelector[icon]}`}>
      {iconSelector[icon]}
      <span>{text}</span>
    </div>
  );
}

Message.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
};

Message.defaultProps = {
  text: "Default text",
  icon: "error",
};
