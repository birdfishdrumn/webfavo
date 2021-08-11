import React from 'react'
import Layout from "src/components/Layout";
import { Auth, Button, IconLogOut } from "@supabase/ui";
import Account from "src/components/Account";
import { client } from "src/libs/supabase";

const edit = () => {
  // const { user } =  client.auth.session()
  // console.log(user)

  return (

    <Layout >

        <div className="mx-auto  max-w-md">
                <Account/>
      </div>


    </Layout>
  )
}

export default edit
