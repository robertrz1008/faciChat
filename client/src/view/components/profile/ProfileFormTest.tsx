import { useState, useEffect, ChangeEvent } from 'react'
import { createImagesRequest } from '../../../api/profileRequest'
import { Image } from '../../../interfaces/contextInterfaces'

function ProfileForm() {

  const [file, setFile] = useState<File | null>()
  const [imageUrl, setImageUrl] = useState(String)
  const [images, setImages] = useState<String[]>()
  const [update, setUpdate] = useState(false)

  function selectHandle(e: ChangeEvent<HTMLInputElement>){
    const selectedFile = e.target.files?.[0]
    setFile(selectedFile)
    if(selectedFile){
      const objectURL = URL.createObjectURL(selectedFile)
      setImageUrl(objectURL)
    }  
  }

  async function uploadImgProfile() {
    if(!file){

      alert("debes subir una foto")

    }else{

      const formData = new FormData()
      formData.append('image', file)

     try {
      //subimos el archivo a la db
      const imgId: any = await createImagesRequest(formData)
      //reemplazamos la img anterio por la recien creda
      // await changeImagesRequest()
    } catch (error) {
      console.log(error)
    }

      document.getElementById('fileInput')
      setFile(null)
    }
  }

  // async function getImages(){
  //   try {
  //     const res = await getImageByIdRequest()
  //     if(Array.isArray(res.data)) {
  //       setImages(res.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    // getImages()
  }, [])
  

  return (
    <>
      <div>
        <input 
            id='fileInput'
            onChange={selectHandle}
            type="file" 
        />
        <button 
            onClick={uploadImgProfile}
        >
          subir
        </button>
      </div>
      { imageUrl && (
        <div>
          <img src={imageUrl} alt="..." style={{ width: "400px", height: "auto" }}/>
        </div>
      )}

{
          !images? (
            <h1>No hay imagenes</h1>
          ):(
            <div className="container d-flex" >
              {
                 images.map((data, id) => (
                  <div key={id} className="card">
                      <img 
                        src={"http://localhost:4000/" + data}
                        className='card-img-top' 
                        style={{height: "auto", width: "300px"}}
                      />
                      <button>update</button>
                      <button 
                      >
                        Delete
                      </button>
                  </div>
                ))
              }
            </div>
          )
           
        }
    </>
  )
}

export default ProfileForm