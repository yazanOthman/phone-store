import React from "react";
import { Link } from "react-router-dom";
import navLogo from "../logo.svg";
import Button from "./Button";
import styled from "styled-components";
const Navbar = () => {
  const NavWrapper = styled.nav`
    background: var(--mainBlue);
    .nav-link {
      color: var(--mainWhite) !important;
      font-size: 1.3rem;
      text-transform: capitalize;
    }
  `;
  return (
    <NavWrapper className="navbar nanbar-expand-sm navbar-dark px-sm-5">
      <Link to={"/"}>
        <img src={navLogo} alt="" className="navbar-brand" />
      </Link>
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            products
          </Link>
        </li>
      </ul>
      <Link to="/cart" className="ml-auto">
        <Button>
          <span className="mr-2">
            <i className="fas fa-cart-plus"></i>
          </span>
          my cart
        </Button>
      </Link>
    </NavWrapper>
  );
};

export default Navbar;
