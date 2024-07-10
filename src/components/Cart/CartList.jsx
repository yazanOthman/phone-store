import React from "react";
import CartItem from "./CartItem";

const CartList = ({ carts }) => {
  return (
    <div className="container-fluid">
      {carts?.map((item, index) => (
        <div key={item.id}>
          <CartItem cartItem={item}></CartItem>
        </div>
      ))}
    </div>
  );
};

export default CartList;
