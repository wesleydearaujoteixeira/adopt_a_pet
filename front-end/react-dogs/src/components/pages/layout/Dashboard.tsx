import {useState, useEffect} from 'react';
import { api } from '../../../utils/api';



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
            <div>
                  <h2> Olá Mundo Home...</h2>
                  {pets && pets.map((item) => {
                        return (
                              <div key={item._id}>
                                    <h3>Nome: {item.name} </h3>
                                    <h3>Idade: {item.age} </h3>
                              </div>
                        )
                  })}
            </div>
      )
}