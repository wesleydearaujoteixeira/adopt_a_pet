import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react';
import { api } from "../../../utils/api";
import { useAuthContext } from "../../../context/UserContext";
import { Select } from "../../Inputs/Select";
import Inputs from "../../Inputs/Inputs";
import petForm from '../../Inputs/FormPets.module.css';
import { useNavigate } from "react-router-dom";


export default function EditPet () {
      
      const obj = useAuthContext();
      
      const { id } = useParams();

      const tokenID = JSON.parse(localStorage.getItem('tokenUserId') || '');
      

      const [pet, setPet] = useState({
            name: '',
            color: 'red',
            age: '',
            weight: '',
            available: true,
            images: [] as File[],
          });

      useEffect(() => {
            api.get(`/pets/${id}`, {
                  headers: {
                        'Authorization': `Bearer ${tokenID}`
                  }
            }).then(response => {
                  console.log(response.data);
                  setPet(response.data.pet);
                  console.log(response.data.pet);
                  console.log(response.data.pet.images[0])
                  // set loading(false);
            })
      }, [tokenID]);


 
      const [preview, setPreview] = useState<string[]>([]);
      const navigate = useNavigate();


      const colors = ['orange', 'cinza', 'vermelho', 'azul'];
    
      function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
          const filesArray = Array.from(e.target.files);
          const previewArray = filesArray.map(file => URL.createObjectURL(file));
          setPet(prevPet => ({
            ...prevPet,
            images: filesArray,
          }));
          setPreview(previewArray);
        }
      }
    
      function handleColor(e: React.ChangeEvent<HTMLSelectElement>) {
        setPet(prevPet => ({ ...prevPet, color: e.target.value }));
      }
    
      function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPet(prevPet => ({ ...prevPet, [e.target.name]: e.target.value }));
      }
    
    
      async function Submit(e: React.FormEvent) {
          e.preventDefault();
        
          if (!tokenID) {
            alert('Token ID is missing');
            return;
          }
        
          const formData = new FormData();
        
          Object.keys(pet).forEach(key => {
            const value = pet[key as keyof typeof pet];
        
            if (key === 'images') {
              pet.images.forEach(image => {
                formData.append('images', image);
              });
            } else {
              formData.append(key, String(value));
            }
          });

      
          try {
            const response = await api.patch(`pets/${id}`, formData, {
              headers: {
                Authorization: `Bearer ${tokenID}`,
                'Content-Type': 'multipart/form-data'
              }
            });
            console.log(response.data.pet);
            alert('Pet atualizado com sucesso!');
            navigate('/mypets');
      
            // Handle success
          } catch (error) {
            console.log('Error ma submição do código:', error);
            // Handle error
          }
        }
    
      return (
        <main>
          {obj?.authenticate ? (
            <>
            
              <h1> Atualizando um Pet</h1>
    
    
              <form onSubmit={(e) => Submit(e)} className={petForm.formPet} >
    
                <div className={petForm.previewInfo}>
    
                  { preview.length > 0 ?
                     preview.map((image, index) =>
                      <img key={index} src={image} alt={`Preview ${index}`} />
                    ) :
                    pet.images.map((image, index) =>
                      <img key={index} src={`http://localhost:5000/images/pets/${image.name}`} alt={`Pet ${index}`} />
                    )
                  }
    
    
                </div>
    
                <Inputs
                  text="Imagem"
                  type="file"
                  name="images"
                  placeholder="Imagem do bichano"
                  handleOnChange={handleFile}
                  multiple={true}
                />
                <Inputs
                  text="Nome"
                  type="text"
                  name="name"
                  placeholder="Nome do seu cachorro"
                  handleOnChange={handleInputChange}
                  value={pet.name}
                />
    
                <Inputs
                  text="Peso"
                  type="text"
                  name="weight"
                  placeholder="Digite o peso"
                  handleOnChange={handleInputChange}
                  value={pet.weight}
                />
    
                <Inputs
                  text="Idade"
                  type="text"
                  name="age"
                  placeholder="Digite a idade"
                  handleOnChange={handleInputChange}
                  value={pet.age}
                />
    
                <Select
                  text="Cor"
                  name="color"
                  options={colors}
                  handleOnChange={handleColor}
                  value={pet.color}
                />
    
                <input type="submit" value="Cadastrar pet" />
              </form>
            </>
          ) : (
            <p>Você precisa estar autenticado para cadastrar um pet.</p>
          )}
        </main>
      );
    }
    