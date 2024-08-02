import {useState, useEffect} from 'react';
import { api } from '../../../utils/api';
import { useAuthContext } from "../../../context/UserContext";
import {Link} from 'react-router-dom'
import petStyle from './Pet.module.css';


type PetType = {
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
      adopter: any;
  }



export default function MyPets () {


      const [pets, setPets] = useState <PetType[]>([]);


      const obj = useAuthContext();


      const token = JSON.parse(localStorage.getItem('tokenUserId') || '');
      const userId = JSON.parse(localStorage.getItem('userID') || '');


      useEffect(() => {
            api.get(`/pets/mypets/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
             .then((response) => {
                setPets(response.data.pets);
              })
             .catch((error) => {
                console.error('Error:', error);
              });
         }, [token]);
      
         const localhost = 'http://localhost:5000/';


         const deleteApet = (id: string) => {
            api.delete(`/pets/${id}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                 .then((response) => {

                      const confirmation = confirm('Are you sure you want to delete');

                        if(confirmation) {
                              const updatedPets = pets.filter(item => item._id !== id);
                              setPets(updatedPets);
                              alert("Pet removido com sucesso");
                              return response.data
                        }

                        alert(" Não foi removido");


                  })
                 .catch((error) => {
                    console.error('Este pode ser um possivel erro:', error);
                  });
         }


         const concludeAdoption = (id: string) => {
            api.patch(`/pets/conclude/${id}`, {}, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                })
                 .then((response) => {
                  alert('Você concluiu a adoção!')
                  console.log(response.data)
                  return response.data;

                 }).catch(error => {
                  console.log("Error:", error);
                  alert('Erro ao concluir adoção!');
                 })

              }


      return (
            <div className={petStyle.petHeader_list }>
              {obj?.authenticate && (
                  <>
                <div>
                  
                  <h2> <Link className={petStyle.Link} to={'/pet/add'}> Cadastrar novo Pet </Link> </h2>
                </div>
                  {pets.length > 0 && <div> 
                        
                        <h1> Pets cadastrados </h1> 

                        {pets && pets.map((pet) => {
                        return (
                              <div key={pet._id} className={petStyle.gridContent}>
                                  
                                  
                                  <h4>Nome: {pet.name} </h4>
                                    <h3>Idade: {pet.age} </h3>
                                    <h3>Peso: {pet.weight} </h3>
                                    <h3>Cor: {pet.color} </h3>
                                    <img className={petStyle.imageDashBoard} src={`${localhost}/images/pets/${pet.images[0]}`} alt="" />
                                    {pet.available ? (

                                          <div className={petStyle.btnAjust}>
                                          
                                          {pet.adopter && (
                                                <button className={petStyle.btnConclude}
                                                onClick={() => concludeAdoption(pet._id)}
                                                > 
                                                  Concluir adoção
                                                  
                                                   
                                                </button>
                                          )}
                                          
                                          <Link className={petStyle.btnEdit} to={`/pet/edit/${pet._id}`}> Editar </Link>
                                          <button onClick={() => deleteApet(pet._id)} className={petStyle.btnDelete}> Excluir </button>

                                          </div>

                                    ): 
                                    <p> Pet já adotado </p>
                                    } 
                                  
                              </div>
                        );
                        })}
                        
                        
                        </div>}
                  {pets.length == 0 && <p> No pets registered yet</p> }
                  </>
              )}
            </div>
      )
}

