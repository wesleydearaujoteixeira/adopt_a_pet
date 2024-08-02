import {useState, useEffect} from 'react';
import { api } from '../../../utils/api';
import dash from './Dash.module.css';
import {Link} from 'react-router-dom';


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

export default function Dashboard () {

      const [pets, setPets] = useState<PetType[]>([]);



      useEffect(() => {
            api.get('/pets').then((response) => {
                  console.log(response.data);
                  setPets(response.data.pets);
             });
            }, []);

      return (
            <div  >

             
                           <h1> Dashboard </h1>

                           <div className={dash.image_content}>
                           
                           {pets && pets.map((pet) => {
                                 return (
                                       <div  className={dash.infoContent} key={pet._id}>
                                             <div>
                                                   <Link to={`/pet/${pet._id}`}> <img className={dash.image_pet_home} src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt="" /> </Link>
                                             </div>
                                             <h3>Nome: {pet.name} </h3>
                                             <h3>Idade: {pet.age} </h3>
                                             <h3> Peso: {pet.weight} </h3>
                                             {pet.available ? (
                                                   <Link to={`/pet/${pet._id}`} className={dash.details}> Mais Detalhes </Link>
                                             ) : <div className={dash.adopter}> Pet já adotado </div>}
                                       </div>
                                 )
                           })}
         
                           </div>                                 
                                 
            </div>
      )
}