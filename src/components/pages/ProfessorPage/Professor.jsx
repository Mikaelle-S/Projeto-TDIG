import axios from "axios";

import { React, Component, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { ErrorMessage, Formik, Form, Field } from "formik";
import authService from "../../../services/auth.service";
import * as yup from "yup";

import authHeader from "../../../services/auth-header";

import "./Professor.css";

const createProjectSchema = yup.object().shape({
  name: yup.string().required("Obrigatório"),
  description: yup.string().required("Obrigatório"),
});

const linkUserSchema = yup.object().shape({
  function: yup.string().required("Obrigatório"),
  projectId: yup.number().required("Obrigatório"),
  username: yup.string().required("Obrigatório"),
});

class Professor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://immense-sands-97611.herokuapp.com/api/v1/projects", {
        headers: authHeader(),
      })
      .then((response) => {
        console.log(response.data);
        this.setState({ lists: response.data });
      });
  }

  handleSubmitting = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      authService.createProject(values.name, values.description);
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  handleSubmitting2 = (values, { setSubmitting, setStatus }) => {
    setStatus({ isValidating: true });
    setTimeout(() => {
      authService.linkUser(values.function, values.projectId, values.username);
      console.info(JSON.stringify(values, null, 2));
      setSubmitting(false);
      setStatus({ isValidating: false });
    }, 400);
  };

  render() {
    return (
      <>
        <Navbar />
        <h1 className="Projeto-title">Projetos Cadastrados</h1>
        <div className="Projeto-List">
          {this.state.lists.map((list) => {
            return (
              <div key={list.id}>
                <h3 className="Projeto-subtitle3">Nome do projeto: {JSON.stringify(list.name)}</h3>
                <h3 className="Projeto-subtitle3">Descrição: {JSON.stringify(list.description)}</h3>
                <h3 className="Projeto-subtitle3">
                  Professor responsável:{" "}
                  {JSON.stringify(list.users["0"].username)}
                </h3>
                <h3 className="Projeto-subtitle3">
                  Cargo do professor: {JSON.stringify(list.users["0"].function)}
                </h3>
                <br />
              </div>
            );
          })}
        </div>
        <Formik
          validationSchema={createProjectSchema}
          initialValues={{
            name: "",
            description: "",
          }}
          onSubmit={this.handleSubmitting}
        >
          {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="Projeto-Cadastro" onSubmit={handleSubmit}>
              <h1 className="Projeto-title">Cadastro de Projeto</h1>
              <h2 className="Projeto-subtitle">
                Preencha os campos para criar um novo projeto
              </h2>
              <div className="Projeto-Group">
                <Field
                  name="name"
                  type="text"
                  placeholder="Nome do Projeto"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="Projeto-Field"
                />
                <ErrorMessage
                  component="span"
                  name="name"
                  className="Projeto-Error"
                />
              </div>
              <div className="Projeto-Description">
                <Field
                  name="description"
                  type="text"
                  placeholder="Descrição do projeto"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="Projeto-Field"
                />
                <ErrorMessage
                  component="span"
                  name="description"
                  className="Projeto-Error"
                />
              </div>
              <button className="Projeto-Btn" type="submit">
                Cadastrar Projeto
              </button>
            </Form>
          )}
        </Formik>
        <Formik
          validationSchema={linkUserSchema}
          initialValues={{
            function: "",
            projectId: 0,
            username: "",
          }}
          onSubmit={this.handleSubmitting2}
        >
          {({ handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className="Projeto-Linkar" onSubmit={handleSubmit}>
              <h1 className="Projeto-title">Linkar Aluno</h1>
              <h2 className="Projeto-subtitle">
                Preencha os campos para criar linkar um aluno a um projeto
              </h2>
              <div className="Projeto-Group">
                <Field
                  name="function"
                  as="select"
                  type="text"
                  placeholder="Função"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="Projeto-Field"
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
                  className="Projeto-Error"
                />
              </div>
              <div className="Projeto-Group">
                <Field
                  name="projectId"
                  type="number"
                  placeholder="ID do projeto"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="Projeto-Field"
                />
                <ErrorMessage
                  component="span"
                  name="projectId"
                  className="Projeto-Error"
                />
              </div>
              <div className="Projeto-Group">
                <Field
                  name="username"
                  type="text"
                  placeholder="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="Projeto-Field"
                />
                <ErrorMessage
                  component="span"
                  name="username"
                  className="Projeto-Error"
                />
              </div>
              <button className="Projeto-Btn" type="submit">
                Linkar Aluno
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}

export default Professor;
