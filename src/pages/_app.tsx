import 'styles/globals.css'
import "tailwindcss/tailwind.css"
import { RecoilRoot } from 'recoil'
import {useEffect} from "react"
import Dialog from "src/components/UIkit/Dialog";


function MyApp({ Component, pageProps }) {
useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles)
    }
  }, [])
  return  (
  <RecoilRoot>
      <Component {...pageProps} />
      <Dialog/>
    </RecoilRoot>
  )

}

export default MyApp
