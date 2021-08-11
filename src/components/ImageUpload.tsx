import React, { useState } from 'react'
import { client } from "src/libs/supabase";
import {decode} from 'base64-arraybuffer'


const ImageUpload:React.FC= () => {

  const [image, setImage] = useState<string>(null)

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const formData = new FormData()
    // formData.append("files", image)
    // // formData.append("ref", "events")
    // // formData.append("refId", evtId)
    // formData.append("field", "image")
    console.log(image)
   const { data, error } = await client
  .storage
  .from('websiteimage')
  .upload(image, decode('base64FileData'), {
    contentType: 'image/jpeg'
  })

    console.log(data)

    // const res = await fetch(`${API_URL}/upload`, {
    //   method:"POST",
    //   body:formData
    // })

    // if (res.ok) {
    //   imageUploaded()
    // }

  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className="text-center">
      <h1>写真を投稿</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input type="file" onChange={handleFileChange}/>
        </div>
        <input type="submit" value="upload" className="btn" />
        <button type="submit">submit</button>

      </form>
    </div>
  )
}

export default ImageUpload
