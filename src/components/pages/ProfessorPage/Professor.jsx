import userService from "../../../services/user.service";
import axios from "axios";

import { React, useEffect, useState } from "react";

import authHeader from "../../../services/auth-header";

const Professor = () => {
  const [projetos, setProjetos] = useState([]);
  useEffect(() => {
    axios
      .get("https://fast-badlands-00990.herokuapp.com/api/v1/projects", {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response);
        setProjetos(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro : " + err);
      });
  }, []);
  return (
    <>
      <div className="projetos-container">
        <h1>Projetos</h1>
        <ul>{projetos}</ul>
      </div>
    </>
  );
};
export default Professor;
