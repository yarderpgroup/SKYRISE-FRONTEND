import { AppContextProvider } from "contexts/AppContextProvider";
import dayjs from "dayjs";
import "dayjs/locale/en-in"; // import locale
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import useAuth from "hooks/useAuth";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import nProgress from "nprogress";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import "../../styles/nprogress.css";
import MaterialTheme from "../utils/MaterialTheme";

export default function App({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  dayjs.extend(isLeapYear); // use plugin
  // dayjs.locale("en-in"); // use locale
  dayjs.extend(LocalizedFormat);
  const { isUserLoading, user } = useAuth();

  dayjs().format("L LT");
  return (
    <>
      <AppContextProvider>
        <MaterialTheme>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Component {...pageProps} />
        </MaterialTheme>
      </AppContextProvider>
    </>
  );
}
