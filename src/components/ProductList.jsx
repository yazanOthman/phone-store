import React, { useContext, useState } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "./ProductProvider";

const ProductList = () => {
  const productContext = useContext(ProductContext);
  console.log(productContext);
  return (
    <>
      <div className="py-5">
        <div className="container">
          <Title name="our" title="product" />
          <div className="row">{productContext}</div>
        </div>
      </div>
    </>
    //  <Product />
  );
};

export default ProductList;
