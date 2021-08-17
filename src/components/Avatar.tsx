import React, { useEffect, useState } from 'react'
import { client } from 'src/libs/supabase'
import { useAvatar } from "src/hooks/useAvatar";
import CircularProgress from '@material-ui/core/CircularProgress';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

interface Props {
  url: string;
  size?: number;
  onUpload:(string:string)=>any
}

const Avatar:React.VFC<Props>  = ({ url, size, onUpload }) =>{
  // const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const {imageUrl} = useAvatar(url,"avatars")


  const  uploadAvatar =async(event:React.ChangeEvent<HTMLInputElement>):Promise<void> =>{
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
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error: unknown | any) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  console.log(imageUrl)

  return (
    <div className="mx-auto">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Avatar"
          className="rounded-full mx-auto"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="avatar no-image" style={{ height: size, width: size }} />
      )}
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
    </div>
  )
}

export default Avatar
