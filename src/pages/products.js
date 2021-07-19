import { products } from "../utils/mockData/productsList.json";

import Product from "../components/product";

import "../styles/products.css";

export default function Products(props) {
  return (
    <div className="products-container">
      {products.map((pr) => (
        <Product {...pr} {...props} />
      ))}
    </div>
  );
}


