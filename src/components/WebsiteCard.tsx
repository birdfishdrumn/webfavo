import React from 'react'
import Link from "next/link"
import { Edit, Delete } from "@material-ui/icons"
import IconButton from "@material-ui/core/IconButton";
import { useAvatar } from 'src/hooks/useAvatar';
import Skeleton from '@material-ui/lab/Skeleton';

const WebsiteCard = ({ item ,handleEdit,handleRemove,loading}) => {
      const { imageUrl } = useAvatar(item.image_url, "websiteimage")
  return (

    <div className="my-4 bg-white p-2 shadow-lg transform transition duration-500 hover:scale-105">

          <a href={item.url} target="_blank"
  rel="noopener">
        <div className="col-span-1 sm:col-span-1 xl:col-span-1">
          {loading ?
            <Skeleton/>
            :
           <img
            alt="..."
            src={item.image_url.indexOf('https') !== -1 ? item.image_url : imageUrl}
            className="h-24 w-30 rounded  mx-auto object-cover mt-4"
          />
        }

        </div>
        </a>

        <div className="col-span-2 sm:col-span-4 xl:col-span-4 my-2 pb-10">
            <h3 className="font-semibold text-black my-2">{item.title?.slice(0,40)}...</h3>
          <p className="text-sm text-gray-500">
         {item.description?.slice(0,50)}....
          </p>
          </div>
              <div className="absolute bottom-0 right-2">
            <p className="text-sm bg-indigo-400 p-2 rounded-xl text-white my-2">{item.category}</p>

          </div>
          <div className="absolute bottom-0 left-0">
            <IconButton onClick={()=>handleEdit(item.id)}>
            <Edit/>
              </IconButton>
          </div>
          <div className="absolute bottom-0 left-12">
            <IconButton onClick={()=>handleRemove(item.id)}>
            <Delete/>
            </IconButton>
        </div>




 </div>
  )
}

export default WebsiteCard
