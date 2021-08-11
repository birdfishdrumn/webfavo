import React,{useCallback,useEffect} from 'react'
import { websiteState } from "src/store";
import { client } from "src/libs/supabase";
import { useRecoilSnapshot, useRecoilState } from "recoil"

export const useGetWeb = () => {
    const [data,setData] = useRecoilState(websiteState)

  const getWeb= async () => {
  const { data, error } = await client
    .from("website")
    .select("*")
  if (!error && data) {
    return data;
  }
  return [];
  };
    // const getWebSite = useCallback(async ():Promise<void> => {
    // const data = await getWeb();
    // setData(data);
    // }, []);
    useEffect(() => {
    getWeb()
    }, [data]);




  return {data}
}
