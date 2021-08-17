import React, { useEffect, useState } from 'react'
import { client } from 'src/libs/supabase'
import CircularProgress from '@material-ui/core/CircularProgress';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import { useAvatar } from 'src/hooks/useAvatar';
import NoImage from "public/noimage.png"
import Image from "next/image"

interface Props {
  url: string;
  onUpload: (string:string) => any;
}

const Thumbnail:React.VFC<Props> = ({ url, onUpload }) => {
  const [uploading, setUploading] = useState(false)
  const { imageUrl }:any = useAvatar(url, "websiteimage")

   const  uploadAvatar =async(event: React.ChangeEvent<HTMLInputElement>):Promise<void> =>{
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await client.storage
        .from('websiteimage')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error:any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }
  return (
    <div>
          <div className="text-center my-8 bg-indigo-500 text-white py-2 px-4 inline-block rounded-2xl">
        <label className="button primary block" htmlFor="single" >
          {uploading ?
              <CircularProgress color="inherit" size={20}/>
            :
            <AddAPhotoIcon/>
            }
        </label>
        <input
           className="absolute w-4 cursor-pointer"
          style={{
            visibility: 'hidden',

          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
      {url ?
        <img src={url?.indexOf('https') !== -1 ? url : imageUrl} className="w-30 h-30 my-4 mx-auto text-center" />
        :
          <Image width={150} height={105} src={NoImage}
              className="object-cover"
              />
    }


    </div>
  )
}

export default Thumbnail
