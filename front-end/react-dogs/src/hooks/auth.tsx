import { api } from '../utils/api';

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

    function register(user: UserTypes) {

            api.post('/users/register', user)
            .then(response => console.log(response.data))
        }



    return { register }


}
