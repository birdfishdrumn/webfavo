import { useEffect, useState,useCallback } from 'react'
import { client } from 'src/libs/supabase'
import { useRecoilState } from "recoil";
import { categoryState } from "src/store";
import {Categories} from "src/types/category"

export const useGetCategory = (id:string) => {


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
      const data: Categories[] | undefined = await getCategory(id);
      if (data) {
              setCategories(data)
      }

    }, [id]);

    useEffect(() => {
   getCategoryList()
  }, [id])


  return { categories }

}
