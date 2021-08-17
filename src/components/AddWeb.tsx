import React, { useState,useEffect,useCallback, ReactEventHandler } from 'react'
import axios from "axios"
import { Web } from "src/types/website"
import { client } from "src/libs/supabase"

import { uidState } from "src/store"
import CircularProgress from '@material-ui/core/CircularProgress';
import { websiteState,dialogState,idState } from "src/store";
import { useRecoilState,useRecoilValue } from "recoil";
import { useGetCategory  } from "src/hooks/useGetCategory";
import { useGetWeb } from "src/hooks/useGetWeb";
import SelectMenu from "src/components/UIkit/SelectMenu";
import Thumbnail from "src/components/Thumbnail";

const AddWeb = () => {

  const [title, setTitle] = useState<string>("")
  const [url, setUrl] = useState<string>("")
    const [category, setCategory] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [isLoading,setIsLoading] = useState<boolean>(false)
  const uuid = useRecoilValue(uidState)
  const [newData, setNewData] = useRecoilState(websiteState)
  const [open, setOpen] = useRecoilState(dialogState)
  const [id, setId] = useRecoilState(idState)
  const [image, setImage] = useState<string>("");
  const { categories } = useGetCategory(uuid)


    const getWeb= async ():Promise<any[]> => {
  const { data, error } = await client
    .from("website")
    .select("*").eq("user_id",uuid)
  if (!error && data) {
    return data;
      };
  return [];
  };

   const getWebSite = useCallback(async ():Promise<void> => {
    const data:Web[] = await getWeb();
    setNewData(data);
  }, []);


  const inputTitle = async(e:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)

  }

    const inputUrl = async(e:React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)

    }

    const inputDescription = async(e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value)
    }

  const decodeUrl:string[] = decodeURI(url).split("/")

  const newUrl = decodeUrl[3] ? decodeUrl[3] : decodeUrl[2]

  const getOgpInfo = useCallback(async (e): Promise<void> => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const res = await axios.get(`/api/ogp?url=${encodeURI(url)}`)
      const data = await res.data
      if (0 != Object.keys(data).length) {
        setIsLoading(false)
         setTitle(data.title)
      setImage(data.image)
      setDescription(data.description)
      } else {

        setTitle(newUrl)
      }

      console.log(data)
    }
    catch (e) {
      console.log(e)
    }finally {
         setIsLoading(false)
    }
  },
    [url],
  );




  const registerWebsite = useCallback(
    async (e) => {
      e.preventDefault()
      if (title === "") {
        alert("Input title.");
        return;
      }
      if (id) {
              const { error } = await client
        .from("website")
        .update({
          user_id: uuid,
          title: title,
          url: url,
          description: description,
          category: category,
          image_url: image

        }).eq("id", id);
          if (error) {
        alert(error);
        console.log(error)
      } else {

          getWebSite()
          setUrl("")
          setTitle("")
          setCategory("")
          setImage("")
          setDescription("")
          setOpen(false)

      }
      } else {
           const { data, error } = await client
        .from("website")
        .upsert([{
          user_id: uuid,
          title: title,
          url: url,
          description: description,
          category: category,
          image_url: image

        }]);
      if (error) {
        alert(error);
        console.log(error)
      } else {
        if (data) {
          setNewData((prevState: Web[]) => [...prevState, ...data])
          setUrl("")
          setTitle("")
          setCategory("")
          setImage("")
          setDescription("")
          setOpen(false)
        }
      }
      }

    },
    [title, uuid, url, description, category, image]
  );

  const getWebsiteEdit = useCallback(
    async () => {
      const { data, error } = await client.from("website").select("*").match({ id: id })
      if (data) {
        const oneData: Web =  data[0]
      setTitle(oneData.title)
      setUrl(oneData.url)
      setCategory(oneData.category)
      setImage(oneData.image_url)
      setDescription(oneData.description)
      }

    },
    [],
  );


  useEffect(() => {
    if (id) {
      getWebsiteEdit()
    }
  }, [open]);




  return (
    <div className="md:w-96 mx-auto">
      <h1 className="text-center mb-8 text-gray-500 font-bold" >お気に入りの登録</h1>
      <form className="w-full max-w-sm">
           <div className="md:items-center mb-6">
    <div className="">
      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        url
            </label>

    </div>
    <div className="">
            <input onChange={inputUrl} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={url}/>
          </div>
            <button
              onClick={getOgpInfo}
            className="bg-indigo-400 rounded-lg p-2 my-2 text-white h-10 w-20">
            {isLoading ?
              <CircularProgress color="inherit" size={20}/>
            :
              "search"
          }


            </button>

        </div>
  <div className="   md:items-center mb-6">
    <div className="w-full">
      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        タイトル
      </label>
    </div>
    <div className="">
            <input onChange={inputTitle} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={title}/>
          </div>

        </div>

                  <div className=" md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        説明
      </label>
    </div>
    <div className="">
            <textarea onChange={inputDescription} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" rows={5} value={description} />
          </div>

        </div>

                  <div className=" md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        カテゴリー
      </label>
    </div>
          <SelectMenu
             label={'カテゴリー'}
            required={true}
            options={categories}
            select={setCategory}
            value={category}
          />

        </div>
                       <div className=" md:items-center mb-6">
    <div className="md:w-1/3">
      <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
        サムネイル
      </label>

              <Thumbnail url={image}
              onUpload={(url:string) => {
        setImage(url)
        // updateProfile({ username, avatar_url: url })
      }}
            />


    </div>


        </div>
        <div className="text-center">
          <button
            type="submit"
              onClick={registerWebsite}
              className="text-center mt-4 mx-auto bg-indigo-400 rounded-lg p-2 my-2 text-white">
              webサイトを登録
            </button>
            </div>


  </form>
    </div>
  )
}

export default AddWeb
