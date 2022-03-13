import * as React from 'react';
import {useNavigate} from 'react-router-dom';

const useAuth = () =>{
    const [authed,setAuthed] = React.useState(false);
    const navigate = useNavigate();

    const login = () => new Promise(()=>{
        setAuthed(true);
        console.log('login',authed);
        setTimeout(()=>{},2000);
        navigate("/");
    });

    const logout = () => new Promise(()=>{
        setAuthed(false);
        console.log('login',authed);
        setTimeout(()=>{},2000);
    });

    const register = () => new Promise(()=>{
        setAuthed(true);
        console.log('cadastrado',authed);
        setTimeout(()=>{},2000);
        navigate("/login");
    });

    return {authed, login, logout,register};

}
export default useAuth;