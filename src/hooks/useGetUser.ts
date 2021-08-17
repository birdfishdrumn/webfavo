import React, { useEffect, useState } from "react";
import { client } from 'src/libs/supabase'


export const useGetUser = (session:any) => {

  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)

  const [avatar_url, setAvatarUrl] = useState(null)

    async function getProfile() {
    try {
      setLoading(true)
      const user = client.auth.user()
      console.log(user)

      let { data, error, status } = await client
        .from('profiles')
        .select(`username, avatar_url`)
        .eq('user_id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)

        setAvatarUrl(data.avatar_url)
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
    }

  useEffect(() => {
    if (session) {
        getProfile()
    }

  }, [session])

  return {username,avatar_url}


  return {}


}


// import React, { useState, useEffect } from 'react'
// import { Post } from 'types/post'
// import { postsState } from 'store/store'
// import { useRecoilState } from 'recoil'

// import { getPosts } from 'lib/post'

// export const useAllPost = () => {
//   const [posts, setPosts] = useRecoilState<Post[]>(postsState)
//   const handleGetPosts = async (): Promise<void> => {
//     const { data } = await getPosts()
//     setPosts(data.posts)
//   }

//   useEffect(() => {
//     handleGetPosts()
//   }, [])

//   return { posts }
// }
