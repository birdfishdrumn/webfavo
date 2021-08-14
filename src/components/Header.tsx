import React,{useState,useEffect} from 'react'
import Link from "next/link";
import router from "next/router"
import { Auth } from "@supabase/ui";
import { client } from "src/libs/supabase";
import { useRecoilState } from "recoil"
import { userState } from "src/store"
import { useGetUser } from "src/hooks/useGetUser"
import { useAvatar } from "src/hooks/useAvatar";
import PopOverItem from "src/components/UIkit/PopOverItem";
import {uidState} from "src/store"

const Header = () => {
    const [session, setSession] = useState(null)
  const [user, setUser] = useRecoilState(userState)
    const [uid, setUid] = useRecoilState(uidState)
  const {username,avatar_url} = useGetUser(session)
  console.log(avatar_url)

  useEffect(() => {
    if (client.auth.session()) {
         const {user} = client.auth.session()
      setSession(user)
      setUid(user?.id)
    } else {
          router.push("/")
    }


    client.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (user) {
                setUid(user?.id)
      } else {
        router.push("/")
      }

    })
  }, [uid,router,session])
  console.log(session)
  const defaultUser = session?.user_metadata
  const {imageUrl} = useAvatar(avatar_url,"avatars")


  return (
    <div className="bg-white h-20">
      <div className="max-w-5xl flex  mx-auto  items-center px-4">
        <div className="flex-1 py-4 font-extrabold  italic">
          <Link href="/">
                    Webファボ
          </Link>
        </div>
        {session ?
                 <ul className="flex items-center">
            <li className="items-center ">
                  <PopOverItem item={  <img className="w-10 h-10 rounded-full items-center my-4"src={imageUrl ? imageUrl : defaultUser?.avatar_url} />}/>
             </li>
        </ul>
          :
                <div>
          <ul className="flex items-center">
            <Link href="/howto">
            <li className="my-4 font-semibold mx-8">使い方</li>
            </Link>
             <li className="my-4 py-2 px-4 text-white font-semibold  rounded-lg bg-indigo-500 hover:bg-indigo-700">Login</li>
        </ul>
        </div>
      }


      </div>
      </div>
  )
}

export default Header
