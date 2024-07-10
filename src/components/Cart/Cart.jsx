import React, { useContext } from "react";
import Title from "../Title";
import CartColumns from "./CartColumns";
import { ProductContext } from "../ProductProvider";
import EmptyCart from "./EmptyCart";
import CartList from "./CartList";
import "../../App.css";
import CartTotal from "./CartTotal";

const Cart = () => {
  const productContext = useContext(ProductContext);
  if (!productContext.cart.length) {
    return <EmptyCart />;
  }
  return (
    <section>
      <Title name="your" title="cart" />
      <CartColumns></CartColumns>
      <CartList carts={productContext.cart} />
      <CartTotal value={productContext} />
    </section>
  );
};

export default Cart;
