import React, { useContext } from "react";
import { ProductContext } from "./ProductProvider";
import { Link } from "react-router-dom";
import Button from "./Button";

const Details = () => {
  const { detailProduct, addToCart, openModal } = useContext(ProductContext);
  const { id, title, img, price, company, info, inCart } = detailProduct;
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
          <h1>{title}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <img src={img} alt="product" className="img-fluid" />
        </div>
        <div className="col-10 mx-auto col-md-6 my-3 text-capitalize">
          <h2>model: {title}</h2>
          <h4 className="text-title text-uppercase text-muted mt-3 mb-2">
            made by: <span className="text-uppercase">{company}</span>
          </h4>
          <h4 className="text-blue">
            <strong>
              price: <span>$</span>
              {price}
            </strong>
          </h4>
          <label className="text-capitalize font-weight-bold mt-3 mb-0">
            some info about product <p className="text-muted lead">{info}</p>
          </label>
          <div>
            <Link to="/">
              <Button>Back to products</Button>
            </Link>
            <Button
              cart="sds"
              disabled={inCart ? true : false}
              onClick={() => {
                addToCart(id);
                openModal(id);
              }}
            >
              {inCart ? "in cart" : "add to cart"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
