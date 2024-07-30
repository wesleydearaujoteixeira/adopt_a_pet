import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/UserContext";
import Inputs from "../../Inputs/Inputs";
import profile from './profile.module.css';
import { api } from '../../../utils/api';

export function Profile () {
    const obj = useAuthContext();

    const [preview, setPreview] = useState <string> ('');

    const [user, setUser] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmpassword: '',
        image: null,
    });

    const id = JSON.parse(localStorage.getItem('userID') || 'null');
    const token = JSON.parse(localStorage.getItem('tokenUserId') || '');

    useEffect(() => {
        if (id && token) {
            api.get(`users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                setUser(response.data.user);
            }).catch(error => {
                console.log("Error:", error);
            });
        }
    }, [id, token]);


    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            setUser({ ...user, [e.target.name]: e.target.files[0] });
            const files: string = e.target.files[0]
            setPreview(files)

        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const form = new FormData();
    
        Object.keys(user).forEach(key => {
            const value = user[key];
            // Se o valor é um objeto, converter para string
            if (value instanceof Blob) {
                form.append(key, value);
            } else {
                form.append(key, String(value));
            }
        });
    
        api.patch(`users/edit/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            alert('Atualizado com sucesso!');
        }).catch((error) => {
            console.log("Erro pode ser esse:", error);
            alert('Erro ao atualizar');
        });

    }



    return (
        <section className={profile.ProfileContent}> 
            {obj?.authenticate && (
                <>
                    <h1>Perfil</h1>
                    

                    {(user.image || preview) && (
                        <img className={profile.profileImage} src={preview ? URL.createObjectURL(preview) : `http://localhost:5000/images/users/${user.image}` } alt={`${user.name}`} />
                    )}



                    <form method="post" onSubmit={onSubmit}>
                        <Inputs 
                            text="Imagem" 
                            type="file" 
                            name="image" 
                            placeholder="Envie uma imagem"
                            handleOnChange={onFileChange}
                        />
                        <Inputs 
                            text="Nome" 
                            type="text" 
                            name="name" 
                            placeholder="Digite seu nome"
                            handleOnChange={handleChange}
                            value={user.name}
                        />
                        <Inputs 
                            text="Email" 
                            type="email" 
                            name="email" 
                            placeholder="Digite seu email"
                            handleOnChange={handleChange}
                            value={user.email}
                        />
                        <Inputs 
                            text="Telefone" 
                            type="text" 
                            name="phone" 
                            placeholder="Digite seu telefone"
                            handleOnChange={handleChange}
                            value={user.phone}
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
                        <button type="submit"> Salvar </button>
                    </form>
                </>
            )}
        </section>
    );
}
