import React, { createContext } from "react";
import { storeProducts } from "../data";

export const ProductContext = createContext();
const ProductProvider = ({ children }) => {
  return (
    <ProductContext.Provider value={storeProducts}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
