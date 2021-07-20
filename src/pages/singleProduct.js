import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { IoMdAddCircleOutline } from "react-icons/io";

import Ad from "../components/ad";
import Overlay from "../components/overlay";

import "../styles/singleProduct.css";

export default function SingleProduct({
  history,
  match: {
    params: { productName },
  },
  products,
  ads,
  deleteAd,
}) {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    price: 0,
  });
  const [selectedAd, setSelectedAd] = useState(null);
  const [overlayVisible, setOverlayVisible] = useState(false);
  useEffect(() => {
    const result = products.find((pr) => pr.productName === productName);
    // const ads =
    setProduct(result);
  }, [products]);
  useEffect(() => {}, [ads]);
  //*=======================================================================
  //*=======================  OPEN OVERLAY =================================
  //*=======================================================================
  const openOverlay = (adId) => {
    setOverlayVisible(true);
    console.log(adId);
    setSelectedAd(adId);
  };
  //*=======================================================================
  //*=======================  CLOSE OVERLAY  ===============================
  //*=======================================================================
  const closeOverlay = (del) => {
    setOverlayVisible(false);
    del && deleteAd(selectedAd);
    setSelectedAd(null);
  };

  return (
    <div className="single-product-container">
      {overlayVisible && (
        <Overlay
          title={"Delete item warning"}
          message={`Do you want to remove the ad ${selectedAd}?`}
          closeOverlay={closeOverlay}
        />
      )}
      {ads
        .filter((a) => a.productName === productName)
        .map((ad) => (
          <Ad openOverlay={openOverlay} ad={ad} />
        ))}
      <div
        className="add-ad"
        onClick={() => history.push(`/createAd/${product.productName}`)}
      >
        <IoMdAddCircleOutline size={120} className={"add-ad-icon"} />
      </div>
    </div>
  );
}

SingleProduct.propTypes = {
  history: PropTypes.object,
  productName: PropTypes.string,
  products: PropTypes.array,
  ads: PropTypes.array,
  deleteAd: PropTypes.func
};

SingleProduct.defaultProps = {
  history: {},
  productName: "Default productName",
  products: [],
  ads: [],
  deleteAd: () => console.log("Default deleteAd")
};
