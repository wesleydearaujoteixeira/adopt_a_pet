import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/UserContext";
import Inputs from "../../Inputs/Inputs";
import profile from './profile.module.css';
import { api } from '../../../utils/api';

export function Profile () {
    const obj = useAuthContext();

    const [user, setUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        api.get('/users/checkUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            setUser(response.data);
        }).catch(error => {
            console.error("Error fetching user data:", error);
        });
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/users/update', user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            alert('Profile updated successfully');
        }).catch(error => {
            console.log("Error updating profile:", error);
        });
    };

    return (
        <section className={profile.ProfileContent}> 
            {obj?.authenticate && (
                <>
                    <h1>Perfil</h1>
                    <p>Preview da Imagem</p>
                    <form onSubmit={handleSubmit}>
                        <Inputs 
                            text="Imagem" 
                            type="file" 
                            name="image" 
                            placeholder="Envie uma imagem"
                            handleOnChange={handleChange}
                        />
                        <Inputs 
                            text="Nome" 
                            type="text" 
                            name="name" 
                            placeholder="Digite seu nome"
                            handleOnChange={handleChange}
                            value={user?.name || ''}
                        />
                        <Inputs 
                            text="Email" 
                            type="email" 
                            name="email" 
                            placeholder="Digite seu email"
                            handleOnChange={handleChange}
                            value={user.email || ''}
                        />
                        <Inputs 
                            text="Telefone" 
                            type="text" 
                            name="phone" 
                            placeholder="Digite seu telefone"
                            handleOnChange={handleChange}
                            value={user.phone || ''}
                        />
                        <Inputs 
                            text="Senha" 
                            type="password" 
                            name="password" 
                            placeholder="Digite sua senha"
                            handleOnChange={handleChange}
                        />
                        <Inputs 
                            text="Confirme a Senha" 
                            type="password" 
                            name="confirmpassword" 
                            placeholder="Confirme sua senha"
                            handleOnChange={handleChange}
                        />
                        <button type="submit">Salvar</button>
                    </form>
                </>
            )}
        </section>
    );
}
