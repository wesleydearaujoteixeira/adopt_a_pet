import { Link, useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { api } from "../../../utils/api";
import details from './details.module.css';
import { useAuthContext } from '../../../context/UserContext';



export default function Details () {

      const { id } = useParams();
      const token = JSON.parse(localStorage.getItem('tokenUserId') || '');

      const tokenUser = localStorage.getItem('tokenUserId') || '';

      interface TypesDetail  {
            pet: {
                  _id: string;
                  name: string;
                  age: number;
                  weight: number;
                  color: string;
                  images: string[];
                  available: boolean;
                  user: {
                        _id: string;
                        name: string;
                        image: string;
                        phone: number;
                  };
                  createdAt: string;
                  updatedAt: string;
                  __v: number;
            }
      }


      const [user, setUser] = useState <TypesDetail> ();
      const obj = useAuthContext();



      useEffect(() => {{
            api.get(`pets/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${token}`
                  }
            }).then((response) => {
                  console.log(response.data)
                  setUser(response.data);
            }).catch(error => console.log(error));


      }}, [id]);


      const ScheduleAvisit = () => {
            api.patch(`pets/schedule/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(tokenUser)}`
                }
            }).then((response) => {
                console.log(response.data);
                alert('Agendamento realizado com sucesso!');
                return response.data;
            }).catch(error => {
                  alert(error.response.data.message)
                console.log("O erro é este: ", error.response.data);
            });
        }
        

      return (

            <div className={details.contentInfo}>
                  <h1> Conhecendo o Pet: <span className={details.namePet}> {user?.pet.name} </span>  </h1>

                  <div className={details.infoPet}>

                        {user?.pet.images.map((image) => {
                              return (
                                    <img className={details.imageContent} key={image} src={`http://localhost:5000/images/pets/${image}`} alt={`Imagem do ${user?.pet.name}`} />
                              )
                        })}


                        <h3>Nome: {user?.pet.name} </h3>
                        <h3>Idade: {user?.pet.age} </h3>
                        <h3>Peso: {user?.pet.weight} </h3>
                        <h3>Cor: {user?.pet.color} </h3>
                        <h3>Disponível: {user?.pet.available? 'Sim' : 'Não'} </h3>
                  </div>

              

                        { obj?.authenticate ?  (
                              <> 
                                  <section>
                                  <h1> Entre em contato com o Dono desse pet </h1>
                                  <h2>Nome do proprietário: {user?.pet.user.name} </h2>
                                  <hr />
                                  <img className={details.imgProfile} src={`http://localhost:5000/images/users/${user?.pet.user.image}`} alt="" />
                                  <hr />
                                  </section>
                              
                              <button onClick={ScheduleAvisit} className={details.btnSchedule}> Agende uma visita </button>
                              </>
                        
                        ) : ( 
                        
                        <div className={details.footerDetails}> 
                              <Link className={details.registerDetails} to={'/register'}> Registrar-se </Link>
                              <h1> Você não está logado </h1> 
                        </div> )}      
            </div>
      )
}