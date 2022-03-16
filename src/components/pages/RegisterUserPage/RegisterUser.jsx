import React from "react";

import { ErrorMessage, Formik, Form, Field } from "formik";
import * as yup from "yup";

import { useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../AuthProvider";
import authService from "../../../services/auth.service";

import "../LoginPage/login.css";

const registerSchema = yup.object().shape({
  function: yup.string().required("Obrigatório"),
  password: yup.string().min(8).required("Obrigatório"),
  registration: yup.number(),
  role: yup.string().required("Obrigatório"),
  username: yup.string().required("Obrigatório"),
});

const RegisterUser = () => {
  const { register } = React.useContext(authContext);
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from || "/login";

  const handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      authService
        .register(
          values.function,
          values.password,
          values.registration,
          values.role,
          values.username
        )
        .then(() => {
          register().then(navigate(from, { replace: true }));
        });
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  return (
    <Formik
      validationSchema={registerSchema}
      initialValues={{
        function: "",
        password: "",
        registration: 101,
        role: "",
        username: "",
      }}
      onSubmit={handleSubmitting}
    >
      {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <Form className="Login-Form" onSubmit={handleSubmit}>
          <h1 className="Login-title">Cadastro</h1>
          <h2 className="Login-subtitle">
            Preencha os campos para criar um novo usuario
          </h2>
          <div className="Login-Group">
            <Field
              name="function"
              as="select"
              type="text"
              placeholder="Função"
              onBlur={handleBlur}
              onChange={handleChange}
              className="Login-Field"
            >
              <option value="TRAINEE">TRAINEE</option>
              <option value="JUNIOR">JUNIOR</option>
              <option value="SENIOR">SENIOR</option>
              <option value="MASTER">MASTER</option>
              <option value="COORDINATOR">COORDENADOR</option>
            </Field>
            <ErrorMessage
              component="span"
              name="function"
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
          <div className="Login-Group">
            <Field
              name="role"
              type="text"
              as="select"
              placeholder="Papel"
              onBlur={handleBlur}
              onChange={handleChange}
              className="Login-Field"
            >
              <option value="TEACHER">PROFESSOR</option>
              <option value="ALUMN">ALUNO</option>
            </Field>
            <ErrorMessage
              component="span"
              name="role"
              className="Login-Error"
            />
          </div>
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
          <button className="Login-Btn" type="submit">
            Cadastrar
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterUser;
