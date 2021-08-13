import { useEffect, useState } from 'react'
import { client } from 'src/libs/supabase'



export const useAvatar = (url:string,type:string) => {
  const [imageUrl, setImageUrl] = useState(null)
    const newUrl = url?.indexOf('https') === -1 && url

  useEffect(() => {
    if (newUrl) downloadImage(newUrl)
  }, [newUrl])

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
