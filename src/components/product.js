import { useState } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { BsChevronUp, BsChevronDown } from "react-icons/bs";

import Button from "../components/button";

function Product({
  productName,
  productDescription,
  productImage,
  price,
  history,
}) {
  const [desVisible, setDesVisible] = useState(false);

  return (
    <div className="card">
      <img src={productImage} alt={productName} />
      <h3>{productName}</h3>
      <div
        className="breadcrumb"
        onMouseEnter={() => setDesVisible(!desVisible)}
        onMouseLeave={() => setDesVisible(!desVisible)}
      >
        <span>Description</span>
        {!desVisible ? (
          <BsChevronUp color={"gray"} />
        ) : (
          <BsChevronDown color={"gray"} />
        )}
        {desVisible && (
          <div className="description-container">
            <p>{productDescription}</p>
          </div>
        )}
      </div>
      <div className="card-footer">
        <Button
          type={"button"}
          title={"Manage Ads"}
          className={"card-button"}
          action={() => history.push(`/singleProduct/${productName}`)}
        />
        <span>€ {price}</span>
      </div>
    </div>
  );
}

export default withRouter(Product);

Product.propTypes = {
  productName: PropTypes.string,
  productDescription: PropTypes.string,
  productImage: PropTypes.string,
  price: PropTypes.number,
  history: PropTypes.object,
};

Product.defaultProps = {
  productName: "Name not available",
  productDescription: "Description not available",
  productImage:
    "https://res.cloudinary.com/estefanodi2009/image/upload/v1626719135/picture_not_available_400-300.png",
  price: 0,
  history: {},
};
