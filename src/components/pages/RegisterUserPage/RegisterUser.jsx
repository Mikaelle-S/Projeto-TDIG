import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as yup from 'yup'

import { useLocation, useNavigate } from 'react-router-dom'
import { authContext } from '../../AuthProvider'

import '../LoginPage/login.css'

const registerSchema = yup.object().shape({
    email: yup.string().email("Inválido").required("Obrigatório"),
    senha: yup.string().min(8).required("Obrigatório"),
});

const RegisterUser = () => {
    const { register } = React.useContext(authContext);
    let navigate = useNavigate();
    let location = useLocation();

    let from = location.state?.from || "/login";

    const handleSubmitting = (values, { setSubmitting, setStatus }) => {
        setStatus({ isValidating: true });
        register().then(navigate(from, { replace: true }))
        setTimeout(() => {
        console.info(JSON.stringify(values, null, 2));
        setSubmitting(false); 
        setStatus({ isValidating: false });
        }, 400);
    };
    
    return (

        <Formik validationSchema={registerSchema} initialValues={{ email: '', password: ''}} onSubmit={handleSubmitting}>
            {({ handleChange, handleBlur, handleSubmit, isSubmitting,
                }) => (                 
                    <Form className="Login-Form" onSubmit={handleSubmit}>
                        <h1 className='Login-title'>Cadastro</h1>
                        <h2 className='Login-subtitle'>Preencha os campos para criar um novo usuario</h2>
                        <div className="Login-Group">
                            <Field name="Nome" type="text" placeholder="Nome" onBlur={handleBlur} onChange={handleChange} className="Login-Field"/>
                            <ErrorMessage component="span" name="Nome" className="Login-Error"/>
                        </div>
                        <div className="Login-Group">
                            <Field name="Sobrenome" type="text" placeholder="Sobrenome" onBlur={handleBlur} onChange={handleChange} className="Login-Field"/>
                            <ErrorMessage component="span" name="Sobrenome" className="Login-Error"/>
                        </div>
                        <div className="Login-Group">
                            <Field name="email" type="text" placeholder="Email" onBlur={handleBlur} onChange={handleChange} className="Login-Field"/>
                            <ErrorMessage component="span" name="email" className="Login-Error"/>
                        </div>
                        <div className="Login-Group">
                            <Field name="senha" type="password" placeholder="Senha" onBlur={handleBlur} onChange={handleChange} className="Login-Field"/>
                            <ErrorMessage component="span" name="senha" className="Login-Error"/>
                        </div>
                        <button className="Login-Btn" type="submit">Cadastrar</button>
                    </Form>
                )} 
    </Formik>
        
    )
}

export default RegisterUser;