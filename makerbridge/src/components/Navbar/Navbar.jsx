import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo-Makerbridge.png";
const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img src={logo} alt="logo" />
        <ul className="navbar-menu">
          <li>Como funciona</li>
          <li>Servicios</li>
          <li>Proveedores</li>
          <li>Sobre Nosotros</li>
        </ul>
        <button>Ingresar</button>
      </div>
      <div className="franja-naranja"></div>
    </>
  );
};

export default Navbar;
