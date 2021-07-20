import PropTypes from "prop-types";

import { RiErrorWarningLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

import Button from "../components/button";

export default function Overlay({ title, message, closeOverlay }) {
  return (
    <div className="overlay">
      <div className="overlay-box">
        <div className="overlay-box-header">
          <>
            <RiErrorWarningLine size={30} color={"gray"} />
            <span>{title}</span>
          </>
          <AiOutlineClose
            size={25}
            color={"gray"}
            onClick={() => closeOverlay(false)}
          />
        </div>
        <div className="overlay-box-main">
          <span>{message}</span>
        </div>
        <div className="overlay-box-footer">
          <Button
            title={"Cancel"}
            className={"cancel-button"}
            type={"button"}
            action={() => closeOverlay(false)}
          />
          <Button
            title={"Confirm"}
            className={"confirm-button"}
            type={"button"}
            action={() => closeOverlay(true)}
          />
        </div>
      </div>
    </div>
  );
}

Overlay.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  closeOverlay: PropTypes.func,
};

Overlay.defaultProps = {
  title: "Default Title",
  message: "Default Message",
  closeOverlay: () => console.log("Default closeOverlay"),
};
