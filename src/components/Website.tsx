import React,{useEffect,useCallback,useState} from 'react'
import Dialog from "src/components/UIkit/Dialog";
import FloatingButton from "src/components/UIkit/FloatingButton";
import { dialogState,websiteState,idState } from "src/store";
import { useRecoilState } from "recoil";
import { Web } from "src/types/website"
import Link from "next/link"
import { Edit, Delete } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton";
import { client } from "src/libs/supabase";
import { useAvatar } from 'src/hooks/useAvatar';
import WebsiteCard from "src/components/WebsiteCard";
import Skeleton from '@material-ui/lab/Skeleton';



type Props = {
  data:Web[]
  category: string;
  getWebSite: VoidFunction
  loading: boolean;
}

const Website:React.VFC<Props> = ({data,category,getWebSite,loading}) => {
  const [open, setOpen] = useRecoilState(dialogState)
  const [webList, setWebList] = useState(data)
  const [id, setId] = useRecoilState(idState)


  console.log(data)

  useEffect(() => {
    const query = category ? data.filter((item) =>
      item.category &&
      item.category.includes(category)
    )
      :
      data;
    setWebList(query)
  }, [category, data]);

    const handleRemove = useCallback(async (id:string) => {
    let { error } = await client
      .from("website")
      .delete()
      .eq("id", id);
      getWebSite()

    if (error) {
      alert(error);
    }

    }, []);

  const handleEdit = useCallback(async (id: string) => {
    setOpen(true);
    setId(id);

  }, []);





  return (
    <div>
         <div id="menu" className="container mx-auto lg:pt-10 lg:pb-64">
      <div className="flex flex-wrap mt-2 justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">


      {webList?.map((item) => (
        <WebsiteCard item={item} handleRemove={handleRemove} handleEdit={handleEdit} loading={loading}/>
      ))}
          </div>
           <Skeleton variant="circle"/>

      </div>
    </div>

      <FloatingButton title="追加"/>


    </div>
  )
}

export default Website
