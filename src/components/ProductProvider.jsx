import React, { createContext, useCallback, useEffect, useState } from "react";
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

  const calculatePrice = useCallback((id, type) => {
    setStateContext((prevValue) => {
      const tempCart = [...prevValue.cart];
      const selectedProduct = tempCart.find((item) => item.id === id);
      const index = tempCart.indexOf(selectedProduct);
      const product = tempCart[index];
      product.count =
        type === "increment" ? product.count + 1 : product.count - 1;
      product.total = product.price * product.count;
      if (product.count === 0) {
        removeItem(id);
      }
      addTotal();
      return {
        ...prevValue,
        cart: [...tempCart],
      };
    });
  }, []);

  const removeItem = useCallback((id) => {
    setStateContext((prevValue) => {
      const tempProducts = [...prevValue.products];
      const removedItem = [...prevValue.cart].filter((item) => item.id !== id);
      const index = tempProducts.indexOf(getProduct(id));
      const removedProduct = tempProducts[index];
      removedProduct.inCart = false;
      removedProduct.count = 0;
      removedProduct.total = 0;
      addTotal();
      return {
        ...prevValue,
        products: [...tempProducts],
        cart: [...removedItem],
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setStateContext((prevValue) => ({
      ...prevValue,
      cart: [],
      products: setProducts(),
      cartSubtotal: 0,
      cartTax: 0,
      cartTotal: 0,
    }));
  }, []);

  const handleDetails = useCallback((id) => {
    const product = getProduct(id);
    setStateContext((prevValue) => ({
      ...prevValue,
      detailProduct: { ...detailProduct, ...product },
    }));
  }, []);

  const addToCart = useCallback((id) => {
    const tempProduct = [...stateContext.products];
    const index = tempProduct.indexOf(getProduct(id));
    const product = tempProduct[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    setStateContext((prevValue) => {
      return {
        ...prevValue,
        products: [...tempProduct],
        cart: [...prevValue.cart, product],
      };
    });
    addTotal();
  }, []);

  const openModal = useCallback((id) => {
    const product = getProduct(id);
    setStateContext((prevValue) => ({
      ...prevValue,
      modalProduct: product,
      modalOpen: true,
    }));
  }, []);

  const closeModal = useCallback(() => {
    setStateContext((prevValue) => ({ ...prevValue, modalOpen: false }));
  }, []);

  const addTotal = useCallback(() => {
    setStateContext((prevValue) => {
      const subTotal = prevValue.cart?.reduce((accu, item) => {
        accu += item.total;
        return accu;
      }, 0);
      const tempTax = subTotal * 0.1;
      const tax = parseFloat(tempTax.toFixed(2));
      const total = subTotal + tax;
      return {
        ...prevValue,
        cartTotal: total,
        cartTax: tax,
        cartSubtotal: subTotal,
      };
    });
  }, []);

  useEffect(() => {
    setStateContext((prevValue) => ({
      ...prevValue,
      addToCart,
      handleDetails,
      openModal,
      closeModal,
      calculatePrice,
      removeItem,
      clearCart,
    }));
  }, [
    addToCart,
    handleDetails,
    openModal,
    closeModal,
    calculatePrice,
    removeItem,
    clearCart,
  ]);

  return (
    <ProductContext.Provider value={stateContext}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
