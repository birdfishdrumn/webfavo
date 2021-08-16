import { useEffect, useState,useCallback } from 'react'
import { client } from 'src/libs/supabase'
import { useRecoilState } from "recoil";
import { categoryState } from "src/store";

export const useGetCategory = (id) => {


  const [categories, setCategories] = useRecoilState(categoryState)

  const getCategory = async(id:string) => {
    if (id) {
        const { data, error } = await client
    .from("category")
    .select("*").eq("uid",id)
  if (!error && data) {
    return data;
  }
  return [];
    }

  };

    const getCategoryList = useCallback(async () => {
      const data = await getCategory(id);
      setCategories(data)
    }, [id]);

    useEffect(() => {
   getCategoryList()
    // setTitles(data);
  }, [id])


  return { categories }

}
