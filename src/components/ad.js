import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { AiOutlineLike } from "react-icons/ai";
import { GoComment } from "react-icons/go";
import { TiArrowForwardOutline } from "react-icons/ti";

import Button from "../components/button";

import logo from "../assets/facebook-logo.png";

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

const capitalize = (sentence) =>
  sentence.charAt(0).toUpperCase() + sentence.slice(1);

function Ad({ history, openOverlay, match, ad }) {
  return (
    <div>
      <div className="ad-container">
        <div className="ad-header">
          <div className="ad-header-top">
            <img src={logo} alt={"logo"} />
            <div>
              <span>{ad.url}</span>
              <span>Sponsored</span>
            </div>
          </div>
          <span>{capitalize(ad.title)}</span>
        </div>
        <div className="ad-gallery">
          {/* GALLERY NOT IMPLEMENTED */}
          <img src={ad.images[0].secure_url} alt={"gallery"} />
        </div>
        <div className="ad-bottom">
          <div>
            <span>{ad.url.toUpperCase()}</span>
            <span>{capitalize(ad.title)}</span>
            <span>
              {capitalize(ad.description).substring(0, 50)}
              {ad.description.length > 50 && "..."}
            </span>
          </div>
          <Button title={"Download"} className={"ad-button"} type={"button"} />
        </div>
        <div className="ad-footer">
          {footerContent.map((obj) => (
            <div key={obj.text} className="icon-container">
              {obj.icon}
              <span>{obj.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ad-buttons-container">
        <Button
          title="Delete"
          type="button"
          className="delete-button"
          action={() => openOverlay(ad.id)}
        />
        <Button
          title="Update"
          type="button"
          className="update-button"
          action={() => history.push(`/updateAd/${match.params.productName}`)}
        />
      </div>
    </div>
  );
}

export default withRouter(Ad);

Ad.propTypes = {
  history: PropTypes.object,
  openOverlay: PropTypes.func,
  match: PropTypes.object,
  ad: PropTypes.object,
};

Ad.defaultProps = {
  history: {},
  openOverlay: () => console.log("Default openOverlay"),
  match: {},
  ad: {},
};
