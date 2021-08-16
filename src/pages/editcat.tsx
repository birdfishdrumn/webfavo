import React, { useState,useCallback,useEffect } from 'react'
import Layout from "src/components/Layout"
import { useGetCategory } from "src/hooks/useGetCategory"
import { useRecoilSnapshot, useRecoilState,useRecoilValue } from "recoil"
import { uidState } from "src/store"
import { Edit, Delete } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from '@material-ui/core/CircularProgress';
import { client } from "src/libs/supabase";
import { categoryState } from "src/store";

const editcat = () => {
  const uid = useRecoilValue(uidState)
  const [id,setId] = useState("")
  const [category, setCategory] = useState<string>("")
  const [addState,setAddState] = useState<boolean>(false)
  const [categories, setCategories] = useRecoilState(categoryState)
  console.log(categories)

  const getCategory = async(uid:string) => {
    if (uid) {
        const { data, error } = await client
    .from("category")
    .select("*").eq("uid",uid)
  if (!error && data) {
    return data;
  }
  return [];
    }

  };

    const getCategoryList = useCallback(async () => {
      const data = await getCategory(uid);
      console.log(data)
      setCategories(data)
    }, [uid]);

    useEffect(() => {
   getCategoryList()
    // setTitles(data);
  }, [uid])


  const style = "text-sm relative flex-none  text-red-400 border-2 border-red-300 text-center px-2 py-1 mx-1 rounded-xl cursor-pointer inline-block my-2"

  const setCategoryTitle = (item)=> {
    setCategory(item.title)
    setId(item.id)
  }

    const inputCategory = (e) => {
    setCategory(e.target.value)
    }

      const handleRemove = useCallback(async (id:string) => {
    let { error,data } = await client
      .from("category")
      .delete()
      .eq("id", id);
      setCategory("")
        getCategoryList()
        if(error){
      alert(error);
    }

      }, [id]);

   const handleEdit= useCallback(async (id:string) => {
    let { error,data } = await client
      .from("category")
      .update({title:category})
      .eq("id", id);

        getCategoryList()
        if(error){
      alert(error);
    }

    }, [id,category]);


  return (
    <Layout>
      <button onClick={() => setAddState(!addState)} className="bg-red-500 text-white rounded-2xl px-4 py-2 mb-4">選択する</button>
      <br/>
    {addState &&
        <>
          <input onChange={inputCategory} className="mx-4 bg-gray-200 appearance-none border-2 w-40 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={category}/>
         <IconButton onClick={()=>handleEdit(id)} >
            <Edit style={{fontSize:"20px"}}/><span className="text-sm ml-1">編集</span>
        </IconButton>
         <IconButton onClick={()=>handleRemove(id)}>
            <Delete style={{fontSize:"20px"}}/><span className="text-sm ml-1">削除</span>
            </IconButton>
        </>
      }
         <div className="pb-4 mx-auto my-6 max-w-2xl">
       {categories ? categories.map((item => (
              <div
                onClick={()=>setCategoryTitle(item)}
                className={style }
                >{item.title}</div>
            )))
               :
                  <CircularProgress/>
                  }
                  </div>

    </Layout>
  )
}

export default editcat
