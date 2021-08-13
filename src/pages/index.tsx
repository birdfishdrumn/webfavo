import { Auth, Button, IconLogOut } from "@supabase/ui";
import type { ReactNode } from "react";
import React,{useState,useEffect,useCallback} from "react";
import Layout from "src/components/Layout";
import Account from "src/components/Account";
import { client } from "src/libs/supabase";
import { Web } from "src/types/website";
import Website from "src/components/Website";
import { useGetCategory } from "src/hooks/useGetCategory"
import useSWR from 'swr';
import { websiteState } from "src/store";
import { useRecoilSnapshot, useRecoilState } from "recoil"

type Props = {
  children: ReactNode;

};

const Container = (props: Props) => {
 const {categories} = useGetCategory()
  const [category, setCategory] = useState("")
  const [loading,setLoading] = useState<boolean>(false)


  const { user } = Auth.useUser();
  const id = user && user.id

  const [data,setData] = useRecoilState(websiteState)

  const getWeb = async () => {
    try {
      setLoading(true)
      const { data, error } = await client
        .from("website")
        .select("*").eq("user_id", id)
      // if (!error && data) {

      // }
      return data;
      // return [];
    } catch (err) {
      alert(err)
    } finally {
      setLoading(false)
    }
  };

   const getWebSite = useCallback(async ():Promise<void> => {
    const data:Web[] = await getWeb();
    setData(data);
  }, [user,data,getWeb]);

  useEffect(() => {
    getWebSite();
  }, [user]);

  const style = "text-sm relative flex-none  text-red-400 border-2 border-red-300 text-center px-2 py-1 mx-1 rounded-xl cursor-pointer"

   const activeStyle="text-sm relative flex-none  border-2 border-red-300 text-center px-2 py-1 mx-1 rounded-xl cursor-pointer bg-red-500 text-white"


  if (user) {
    return (
      <div>
        <div className="justify-end mx-2 my-4 h-64">
          <div>
            {data ?
              <>
                 <div className="flex overflow-x-auto pb-4 mx-auto my-4">
            {categories.map((item => (
              <div
                onClick={()=>setCategory(item.title)}
                className={item.title === category ?  activeStyle  : style }
                >{item.title}</div>
            )))}
            </div>

                <Website data={data} category={category} getWebSite={getWebSite} loading={loading} />
              </>
              :
              <h1 className="font-bold text-center text-sm">エラーが発生しました。再読み込みしてください。</h1>
            }



          </div>

        </div>
      </div>
    );
  }
  return <>{props.children}</>;
};

const Home = ({ category }) => {

  return (
    <Layout>
      <Auth.UserContextProvider supabaseClient={client}>
        <Container >
          <div className="flex justify-center pt-8">
            <div className="w-full sm:w-96">
              <Auth
                supabaseClient={client}
                providers={["google"]}
                socialColors={true}
              />
            </div>
          </div>
        </Container>
      </Auth.UserContextProvider>
    </Layout>
  );
};

// export async function getServerSideProps() {

//   const { data, error } = await client
//     .from("website")
//     .select("*")

//   // if (!error && data) {
//   //   return data;
//   // }
//   console.log(data)

//   return {
//     props: {
//       data: data
//     }
//   }
// }






export default Home;
