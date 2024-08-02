import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/UserContext";
import Inputs from "../../Inputs/Inputs";
import profile from './profile.module.css';
import { api } from '../../../utils/api';

export function Profile () {


    interface User {
        name: string;
        phone: string;
        email: string;
        password: string;
        confirmpassword: string;
        image: Blob | null;
    }
    const obj = useAuthContext();

    const [preview, setPreview] = useState <string> ('');

    const [user, setUser] = useState <User> ({
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
          const file = e.target.files[0];
          setUser((prevUser) => ({
            ...prevUser,
            [e.target.name]: file,
          }));
    
          const fileUrl = URL.createObjectURL(file);
          setPreview(fileUrl);
        }
      }



    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
    
        const form = new FormData();
    
        (Object.keys(user) as (keyof User)[]).forEach(key => {
            const value = user[key];
            if (value instanceof Blob) {
                form.append(key, value);
            } else {
                form.append(key, String(value));
            }
        });
    
        api.patch(`users/edit/${id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log(response.data);
            alert('Atualizado com sucesso!');
            // Limpar formulário, se necessário
            // e.target.reset(); // Se estiver usando referências para os campos, ajuste conforme necessário
        })
        .catch(error => {
            console.error('Erro ao atualizar:', error);
            if (error.response) {
                console.error('Erro no servidor:', error.response.data);
                alert(`Erro no servidor: ${error.response.data.message}`);
            } else if (error.request) {
                console.error('Erro na solicitação:', error.request);
                alert('Erro na solicitação. Por favor, tente novamente.');
            } else {
                console.error('Erro:', error.message);
                alert(`Erro: ${error.message}`);
            }
        });
    }
    



    return (
        <section className={profile.ProfileContent}> 
            {obj?.authenticate && (
                <>
                    <h1>Perfil</h1>
                    

                    {(user.image || preview) && (
                        <img className={profile.profileImage} src={preview || `http://localhost:5000/images/users/${user.image}`}/>

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
