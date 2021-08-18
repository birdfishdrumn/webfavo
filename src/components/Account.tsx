import { useState, useEffect } from 'react'
import { client } from 'src/libs/supabase'
import { useGetUser } from "src/hooks/useGetUser"
import Avatar from "src/components/Avatar"
import NotUser from "src/components/NotUser";


export default function Account({  }) {

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState("")

  const [avatar_url, setAvatarUrl] = useState("")
       const user = client.auth.user()
  useEffect(() => {
    if (user) {
      getProfile()
    }

  }, [user]);

  async function getProfile() {
    try {
      setLoading(true)

      const id = user && user.id
      console.log(id)

      let { data, error, status } = await client
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('user_id',id )
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)

        setAvatarUrl(data.avatar_url)
        console.log(data)
      }
    } catch (error:any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


  interface Props {
    username: string;
    avatar_url:string
  }

  async function updateProfile({ username, avatar_url }:Props) {
    try {
      setLoading(true)
      const user = client.auth.user()
      const updates = {
        user_id: user?.id,
        username,

        avatar_url,
        updated_at: new Date(),
      }
      if (username) {
       let { error } = await client.from('profiles').update(updates, {
        returning: 'minimal', // Don't return the value after inserting
      }).eq("user_id", user?.id)
      } else {
         let { error } = await client.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
         }).eq("user_id", user?.id)
          if (error) {
        throw error
      }
      }

    } catch (error:any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
      <>
    {
      user ?
         <div className="text-center bg-white shadow-lg pb-4 pt-8" >
      <Avatar
      url={avatar_url}
      size={150}
      onUpload={(url) => {
        setAvatarUrl(url)
        updateProfile({ username, avatar_url: url })
      }}
    />

      <div>
        <label htmlFor="username" className="font-semibold my-4 mx-4">Name</label>
        <input
          id="username"
          className="bg-gray-100 p-2 rounded-sm"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="my-8">
        <button
          className="bg-indigo-500 text-white rounded-2xl py-2 px-4"
          onClick={() => updateProfile({ username, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : '更新する'}
        </button>
      </div>

    </div>
      :
      <NotUser/>

    }
      </>

  )
}
