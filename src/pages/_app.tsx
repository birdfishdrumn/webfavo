import 'styles/globals.css'
import "tailwindcss/tailwind.css"
import { RecoilRoot } from 'recoil'
import {useEffect} from "react"
import Dialog from "src/components/UIkit/Dialog";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'


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
      <ToastContainer/>
      <Component {...pageProps} />
      <Dialog/>
    </RecoilRoot>
  )

}

export default MyApp
