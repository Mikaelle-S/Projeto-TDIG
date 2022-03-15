import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./AuthProvider";

import "./Navbar.css";

const Navbar = () => {
  const { authed, logout } = React.useContext(authContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div>
      <nav className="App-Menu">
        <ul className="App-Menu-List">
          <li className="App-Menu-Item">
            <Link className="App-Menu-Link" to="/">
              Home
            </Link>
          </li>
          <li className="App-Menu-Item">
            <Link className="App-Menu-Link" to="/login">
              login
            </Link>
          </li>
          <li className="App-Menu-Item">
            <Link className="App-Menu-Link" to="/signup">
              Cadastrar
            </Link>
          </li>
          <li className="App-Menu-Item">
            <input type="search" name="pesquisar" placeholder="Pesquisar.." />
          </li>
          {authed && (
            <button className="Btn-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
