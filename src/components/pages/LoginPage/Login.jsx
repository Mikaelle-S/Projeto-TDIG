import { React } from "react";
import authService from "../../../services/auth.service";

import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";

import "./login.css";

import { Link, useLocation, useNavigate } from "react-router-dom";

const validations = yup.object().shape({
  password: yup.string().min(8).required("Obrigatório"),
  username: yup.string().required("Obrigatório"),
});

const Login = () => {
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from || "/";

  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      authService.login(values.password, values.username);
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  return (
    <Formik
      validationSchema={validations}
      initialValues={{ password: "", username: "" }}
      onSubmit={handleSubmitting}
    >
      {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form className="Login-Form" onSubmit={handleSubmit}>
          <h1 className="Login-title">Login</h1>
          <h2 className="Login-subtitle">
            Informe seu username e senha para acessar
          </h2>
          <div className="Login-Group">
            <Field
              name="username"
              type="text"
              placeholder="Username"
              onBlur={handleBlur}
              onChange={handleChange}
              className="Login-Field"
            />
            <ErrorMessage
              component="span"
              name="username"
              className="Login-Error"
            />
          </div>
          <div className="Login-Group">
            <Field
              name="password"
              type="password"
              placeholder="Senha"
              onBlur={handleBlur}
              onChange={handleChange}
              className="Login-Field"
            />
            <ErrorMessage
              component="span"
              name="password"
              className="Login-Error"
            />
          </div>
          <button className="Login-Btn" type="submit" disabled={isSubmitting}>
            Login
          </button>
          <button className="Login-Btn" type="submit" disabled={isSubmitting}>
            <Link className="Login-Link" to="/RegisterUser">
              Cadastrar
            </Link>
          </button>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
