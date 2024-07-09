import React, { useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "./ProductProvider";

const ProductList = () => {
  const { products } = useContext(ProductContext);
  console.log("products", products);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="product" />
          <div className="row">
            {products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
