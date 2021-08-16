import React, { useState } from 'react'
import { client } from "src/libs/supabase";
import { useRecoilState, useRecoilValue } from "recoil";
import { toast } from 'react-toastify'
import { categoryState } from "src/store";
import { uidState } from "src/store"
import { Categories } from "src/types/category";

const AddCategory = () => {
  const [addState, setAddState] = useState<boolean>(false)
  const [category, setCategory] = useState<string>("")
    const [categories, setCategories] = useRecoilState(categoryState)

   const uuid = useRecoilValue(uidState)

  const inputCategory = (e) => {
    setCategory(e.target.value)

  }

  const categoryAdd = async() => {
    if (category === "") {
     return
    }
            const { data, error } = await client
        .from("category")
              .insert([{
          uid: uuid,
          title:category
              }]);
     if (error) {
        alert(error);
        console.log(error)
     } else {
       toast.success(`${category}をカテゴリーに追加しました！`)
       setCategory("")
        setCategories((prevState: Categories[]) => [...prevState, ...data])
      }

  }
  return (
    <div>
      <button onClick={() => setAddState(!addState)} className="bg-red-500 text-white rounded-2xl px-4 py-2">＋</button>
      {addState &&
        <>
          <input onChange={inputCategory} className="mx-4 bg-gray-200 appearance-none border-2 w-40 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value={category}/>
        <button onClick={() => categoryAdd()} className={category === "" ?  "rounded-2xl px-4 py-2 bg-gray-200 text-gray-400" : "bg-red-500 text-white rounded-2xl px-4 py-2" }>追加</button>
        </>
      }



    </div>
  )
}

export default AddCategory
