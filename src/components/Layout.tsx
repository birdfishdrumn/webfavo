import type { ReactNode } from "react";
import React,{useState,useEffect} from 'react'
// import { Footer } from "./Footer";
import  Header  from "./Header";
import { client } from "src/libs/supabase";
import { useRecoilState } from "recoil"
import { userState } from "src/store"
import {uidState} from "src/store"
import router from "next/router"
import { useGetUser } from "src/hooks/useGetUser"

type Props = {
  children: ReactNode;
};

const Layout = (props: Props) => {

  return (
    <div className="bg-gray-50  ">
      <div className=" mx-auto  min-h-screen">
        <Header/>
        <main className="my-10 container px-2 text-gray-600 bg-gray-50 mx-auto max-w-4xl">

          <div className="mx-1">{props.children}</div>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout
