import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function MyPets () {

      const [pets, setPets] = useState([]);

      return (
            <div>
                  <h1> My pets </h1>
                  <h2> <Link to={'/pet/add'}> Cadastrar novo Pet </Link> </h2>
                  {pets.length > 0 && <p> Pets cadastrados </p>}
                  {pets.length == 0 && <p> No pets registered yet</p> }
            </div>
      )
}