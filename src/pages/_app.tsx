import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { AppProps } from "next/app";
import App, { AppContext } from "next/app";
import Head from "next/head";
import cookie from 'cookie'
import userService from "@/service/user";
import { useEffect } from 'react'
import { useGlobalState } from "@/state";

type AppType = {
  cookieStr: string | null,
  token: string | undefined
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const userInfo = pageProps.userInfo
  const tokenStr = pageProps.token
  const [user, setUser] = useGlobalState('currentUser')
  const [token, setToken] = useGlobalState('token')
  useEffect(() => {
    if (userInfo.id) {
      setUser(userInfo)
      setToken(tokenStr)
    }
  }, [user])
  return (
      <div id="root">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="wrapper-content">
        <Header />
        <Component {...pageProps} />
        <div className="spacing"></div>
        <Footer />
      </div>
    </div>
  );
}


MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const cookieStr = appContext.ctx.req?.headers.cookie || ''
  const token = cookie.parse(cookieStr).token
  let userRes = null
  if (token != '') {
    try {
      userRes = await userService.fetchMe(token)
    } catch(err) {
      console.log(err);
    }
  }
  return {
    pageProps: {
      ...appProps.pageProps,
      userInfo: userRes,
      token
    },
  };
};
