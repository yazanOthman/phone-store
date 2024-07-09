import React, { createContext, useEffect, useState } from "react";
import { detailProduct, storeProducts } from "../data";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  const setProducts = () => {
    let tempProduct = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProduct = [...tempProduct, singleItem];
    });
    return tempProduct;
  };

  const [stateContext, setStateContext] = useState({
    products: setProducts(),
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartTax: 0,
    cartSubtotal: 0,
    cartTotal: 0,
  });
  const getProduct = (id) => {
    const product = stateContext.products.find((item) => item.id === id);
    return product;
  };

  const increment = (id) => {
    console.log("this is increment method");
  };
  const decrement = (id) => {
    console.log("this is decrement method");
  };
  const removeItem = (id) => {
    const removedItem = stateContext.cart.filter((item) => item.id !== id);
    setStateContext((prevValue) => ({
      ...prevValue,
      cart: [...stateContext.cart, ...removedItem],
    }));
    console.log("this is removeitem method");
  };

  const clearCart = () => {
    setStateContext((prevValue) => ({
      ...prevValue,
      cart: [],
    }));
    console.log("cart is cleared");
  };

  const handleDetails = (id) => {
    const product = getProduct(id);
    setStateContext((prevValue) => ({
      ...prevValue,
      detailProduct: { ...detailProduct, ...product },
    }));
  };
  const addToCart = (id) => {
    const tempProduct = [...stateContext.products];
    const index = tempProduct.indexOf(getProduct(id));
    const product = tempProduct[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setStateContext((prevValue) => ({
      ...prevValue,
      detailProduct: { ...detailProduct, ...product },
      products: [...tempProduct],
      cart: [...stateContext.cart, product],
    }));
  };

  const openModal = (id) => {
    const product = getProduct(id);
    setStateContext((prevValue) => ({
      ...prevValue,
      modalProduct: product,
      modalOpen: true,
    }));
  };

  const closeModal = () => {
    setStateContext((prevValue) => ({ ...prevValue, modalOpen: false }));
  };

  useEffect(() => {
    setStateContext((prevValue) => ({
      ...prevValue,
      addToCart,
      handleDetails,
      openModal,
      closeModal,
      increment,
      decrement,
      removeItem,
      clearCart,
    }));
  }, []);

  return (
    <ProductContext.Provider value={stateContext}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
