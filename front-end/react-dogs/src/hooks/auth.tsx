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
                console.log(response.data)
                return response.data
            })
            .catch((err) => {
                console.error(err.message);
                throw new Error(err.message);
            })
        }


        function logout () {

            confirm('Você tem certeza que deseja deslogar?');
            
                setTimeout(() => {
                    localStorage.removeItem('token');
                    setAutenticate(false);
                 }, 1000);  
               
    
        }


    return {authenticate,  register, logout, Login }


}
