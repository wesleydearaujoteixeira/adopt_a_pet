import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import styles from "./Adoptions.module.css";

export default function MyAdoptions() {

      const token = JSON.parse(localStorage.getItem('tokenUserId') || '');
      const userId = JSON.parse(localStorage.getItem('userID') || '');



      /*
      
      {
	"pets": [
		{
			"_id": "66aab492fdf262c1615eb297",
			"name": "jerico",
			"age": 2,
			"weight": 13,
			"color": "red",
			"images": [
				"17224633781427.jpg"
			],
			"available": true,
			"user": {
				"_id": "66a30a75818d3887ceb22ae8",
				"name": "João Felix",
				"image": "17223283178747.jpg",
				"phone": 1231537136
			},
			"createdAt": "2024-07-31T22:02:58.145Z",
			"updatedAt": "2024-08-01T23:51:08.041Z",
			"__v": 0,
			"adopter": {
				"_id": "66a2cc36a4d97388a4b7da22",
				"name": "Eduardo",
				"image": "17220446056786.jpg",
				"phone": 2342343251
			}
		}
	]
}
      
      */


      interface TypeAdoptions {
            _id: string,
            name: string,
            images: string[],
            available: boolean,
            user: {
              _id: string,
              name: string,
              image: string,
              phone: number
            },
            adopter: {
              _id: string,
              name: string,
              image: string,
              phone: number
            },
            createdAt: string,
            updatedAt: string,
            __v: number,
   
      }

      const [adoptions, setAdoptions] = useState <TypeAdoptions[]> ([])

      useEffect(() => {
            api.get(`/pets/myadoptions/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }).then((response) => {
              setAdoptions(response.data.pets);
              console.log(response.data.pets)
              return response.data.pets;
            })
       .catch((error) => {
            console.log(error.message)
      });

}, [userId])

      return (
        <section>
            <div className={styles.headerAdoptions}>
                  <h1> Minhas adoções </h1>
                  {adoptions.length === 0 && <span> Não há Pets para adoção ainda... </span>}
                  {adoptions.length > 0 && 
                  
                  <div>
                        {adoptions.map((pet) => {
                              return (
                                    <div key={pet._id} className={styles.adoptionContent}>
                                          <div>
                                                <img className={styles.adoptionsImage} src={`http://localhost:5000/images/pets/${pet.images[0]}`} alt={pet.name} />
                                                <p>Dono: <span>{pet.user.name}</span> </p>
                                                <p>Telefone: <span>{pet.user.phone}</span> </p>
                                                 <div className={styles.Span}>
                                                       {pet.available ?
                                                                  (
                                                                                                       
                                                                  <div>
                                                                                                       
                                                                  <p> Em processo de adoção... </p>
                                                                                                       
                                                                  </div>
                                                            ): <div> <p className={styles.adotado}> Já adotado </p> </div>}
                                                 </div>
                                          </div>
                                    </div>
                                    
                                    
                              )
                              
                        })}
                        
                  </div>}

            </div>
        </section>
      )
}

