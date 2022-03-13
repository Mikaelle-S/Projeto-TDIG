import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import './login.css'

import { authContext } from '../../AuthProvider'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const validations = yup.object().shape({
    email: yup.string().email("Inválido").required("Obrigatório"),
    senha: yup.string().min(8).required("Obrigatório"),
});

const Login = () =>{
    const { login } = React.useContext(authContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from || "/";

    const handleSubmitting = (values, { setSubmitting, setStatus }) => {
        setStatus({ isValidating: true });
        login().then(navigate(from, { replace: true }))
        setTimeout(() => {
        console.info(JSON.stringify(values, null, 2));
        setSubmitting(false); 
        setStatus({ isValidating: false });
        }, 400);
    };

    return (
        <Formik validationSchema={validations} initialValues={{ email: '', password: ''}} onSubmit={handleSubmitting}>
            {({ handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => ( 
                   <Form className="Login-Form" onSubmit={handleSubmit}>
                       <h1 className='Login-title'>Login</h1>
                        <h2 className='Login-subtitle'>Informe seu email e senha para acessar</h2>
                       <div className="Login-Group">
                           <Field name="email" type="text" placeholder="Email" onBlur={handleBlur} onChange={handleChange} className="Login-Field"/>
                           <ErrorMessage component="span" name="email"  className="Login-Error" />
                       </div>
                       <div className="Login-Group">
                           <Field name="password" type="password" placeholder="Senha" onBlur={handleBlur} onChange={handleChange} className="Login-Field" />
                           <ErrorMessage component="span" name="password" className="Login-Error"/>
                       </div>
                       <button className="Login-Btn" type="submit" disabled={isSubmitting}>Login</button>
                       <button className="Login-Btn" type="submit" disabled={isSubmitting}>
                           <Link className='Login-Link' to="/RegisterUser">Cadastrar</Link>
                        </button>
                   </Form>
            )}    
        </Formik> 
    )
}
export default Login;
