import React, { useContext } from "react";
import styled from "styled-components";
import { ProductContext } from "./ProductProvider";
import Button from "./Button";
import { Link } from "react-router-dom";

const Modal = () => {
  const { modalOpen, modalProduct, closeModal } = useContext(ProductContext);
  const { img, title, price } = modalProduct;

  if (!modalOpen) {
    return null;
  }

  return (
    <ModalContainer>
      <div className="container">
        <div className="row">
          <div
            id="modal"
            className="col-8 mx-auto col-md-6 col-lg-4 text-center text-capitalize p-5"
          >
            <h5>Item added to the cart</h5>
            <img src={img} className="img-fluid" alt="product" />
            <h5>{title}</h5>
            <h5 className="text-muted">price: $ {price}</h5>
            <Link to="/">
              <Button className="" onClick={() => closeModal()}>
                continue shopping
              </Button>
            </Link>
            <Link to="/cart">
              <Button cart="true" onClick={() => closeModal()}>
                go to cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
