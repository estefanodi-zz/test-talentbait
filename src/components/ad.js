import PropTypes from "prop-types";

// import { FaFacebook } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { TiArrowForwardOutline } from "react-icons/ti";

import Button from "../components/button";

const footerContent = [
  {
    text: "Like",
    icon: <AiOutlineLike size={18} />,
  },
  {
    text: "Comment",
    icon: <GoComment size={18} />,
  },
  {
    text: "Share",
    icon: <TiArrowForwardOutline size={18} />,
  },
];

export default function Ad({ history, setOverlayVisible }) {
  return (
    <div>
      <div className="ad-container">
        <div className="ad-header"></div>
        <div className="ad-gallery"></div>
        <div className="ad-bottom"></div>
        <div className="ad-footer">
          {footerContent.map((obj) => (
            <div key={obj.text} className="icon-container">
              {obj.icon}
              <span>{obj.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="buttons-container">
        <Button
          title="Delete"
          type="button"
          className="delete-button"
          action={() => setOverlayVisible(true)}
        />
        <Button
          title="Update"
          type="button"
          className="update-button"
          action={() => history.push("/updateAd")}
        />
      </div>
    </div>
  );
}

Ad.propTypes = {
  history: PropTypes.object,
  setOverlayVisible: PropTypes.func,
};

Ad.defaultProps = {
  history: {},
  setOverlayVisible: () => {},
};
