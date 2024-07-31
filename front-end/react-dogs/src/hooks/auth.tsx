import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import useFlashMessage from './flashMessage';
import { useNavigate } from 'react-router-dom';

//import {useState, useEffect} from 'react';
//import {useHistory} from 'react-router-dom';


export type UserTypes = {
    name: string;
    phone: string;
    email: string;
    password: string;
    confirmpassword: string;
} 

export default function useAuth() {


    const [authenticate, setAutenticate] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            setAutenticate(true);
        } 
        }, []);


    const { setFlashMessage } = useFlashMessage();


    function register(user: UserTypes) {


        let msgText: string = "Usuário Cadastrado com sucesso";
        let msgType: string = "success";

            api.post('/users/register', user)
            .then(response => {
                
                console.log(response.data)
           
                setTimeout(() => {
                    setAutenticate(true);
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    navigate('/');
                }, 2000)

       
            
            })
            .catch(err => {
                console.error(err.message);
                msgText = err.message;
                msgType = 'error';
            
            });

            setFlashMessage(msgText, msgType)
        }

        function Login (user: UserTypes) {

            api.post('/users/login', user).then((response) => {
                setAutenticate(true);

                console.log(response.data);
                console.log("User id aqui:  ", response.data.userId);
                console.log("Seu Token é este:", response.data.token);
                

                localStorage.setItem('userID', JSON.stringify(response.data.userId));
                localStorage.setItem('tokenUserId', JSON.stringify(response.data.token));
                navigate('/');
                return response.data
            })
            .catch((err) => {
                console.log(err.message);
            })
        }


            function logout () {
                        localStorage.removeItem('userID');
                        localStorage.removeItem('tokenUserId');
                        setAutenticate(false);
                        api.defaults.headers.Authorization = null;
                  
             }


    return {authenticate,  register, logout, Login, setAutenticate }


}
