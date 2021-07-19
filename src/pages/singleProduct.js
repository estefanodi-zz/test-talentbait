import { useState } from "react";
import PropTypes from "prop-types";
import { IoMdAddCircleOutline } from "react-icons/io";

import Ad from "../components/ad";
import Overlay from "../components/overlay";
// import Button from "../components/button";

import "../styles/singleProduct.css";

export default function SingleProduct({ history, match }) {
  const [product] = useState({
    productName: "banana",
    productDescription: "banana description",
    productImage: "",
    price: 200,
  });
  const [overlayVisible, setOverlayVisible] = useState(false);
  //*=======================================================================
  //*===========================  DELETE AD  ===============================
  //*=======================================================================
  const deleteAd = () => {
    setOverlayVisible(false);
  };
  return (
    <div className="single-product-container">
      {overlayVisible && (
        <Overlay
          title={"Delete item warning"}
          message={`Do you want to remove the ad ${product.productName}?`}
          deleteAd={deleteAd}
          setOverlayVisible={setOverlayVisible}
        />
      )}
      {ads.map((ad) => (
        <Ad setOverlayVisible={setOverlayVisible} />
      ))}
      <div className="add-ad" onClick={() => history.push("/createAd")}>
        <IoMdAddCircleOutline size={120} className={"add-ad-icon"} />
      </div>
    </div>
  );
}

SingleProduct.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

SingleProduct.defaultProps = {
  history: {},
  match: {},
};

const ads = [
  {
    title: "ad 1",
    description: "ad 1 description",
    images: [],
    url: "",
    button: {},
    footerContent: [
      {
        icon: "",
        text: "",
        action: () => {},
      },
      {
        icon: "",
        text: "",
        action: () => {},
      },
      {
        icon: "",
        text: "",
        action: () => {},
      },
    ],
  },
  {
    title: "ad 1",
    description: "ad 1 description",
    images: [],
    url: "",
    button: {},
    footerContent: [
      {
        icon: "",
        text: "",
        action: () => {},
      },
      {
        icon: "",
        text: "",
        action: () => {},
      },
      {
        icon: "",
        text: "",
        action: () => {},
      },
    ],
  },
];
