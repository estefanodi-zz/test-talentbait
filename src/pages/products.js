import PropTypes from "prop-types";

import Product from "../components/product";

import "../styles/products.css";

export default function Products({ products }) {
  return (
    <div className="products-container">
      {products.map((pr) => (
        <Product {...pr} />
      ))}
    </div>
  );
}

Products.propTypes = {
  products: PropTypes.array,
};

Products.defaultProps = {
  products: [],
};