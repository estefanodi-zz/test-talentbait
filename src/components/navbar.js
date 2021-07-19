import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className={"navbar"}>
      <NavLink exact to={"/"} activeClassName="active-link">
        Products List
      </NavLink>
    </nav>
  );
};

export default Navbar;
