import { useEffect, useState } from 'react'
import { client } from 'src/libs/supabase'



export const useAvatar = (url:string,type:string) => {
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path) {
    try {
      const { data, error } = await client.storage.from(type).download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      console.log(url)
      setImageUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  return { imageUrl }

}
