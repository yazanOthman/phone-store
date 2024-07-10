import { Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../src/components/Navbar";
import ProductList from "../src/components/ProductList";
import Details from "../src/components/Details";
import Cart from "./components/Cart/Cart";
import NotFound from "../src/components/NotFound";
import Modal from "./components/Modal";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/details" element={<Details />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Modal />
    </>
  );
}

export default App;
