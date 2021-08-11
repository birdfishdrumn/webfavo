import { useEffect, useState,useCallback } from 'react'
import { client } from 'src/libs/supabase'

export const useGetCategory = () => {


  const [categories, setCategories] = useState([])

  const getCategory = async () => {
  const { data, error } = await client
    .from("category")
    .select("*")
  if (!error && data) {
    return data;
  }
  return [];
  };

    const getCategoryList = useCallback(async () => {
      const data = await getCategory();
      setCategories(data)
    }, []);

    useEffect(() => {
   getCategoryList()
    // setTitles(data);
  }, [])


  return { categories }

}
