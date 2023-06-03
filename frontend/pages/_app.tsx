import type { AppProps } from "next/app";
import localFont from "@next/font/local";
import "../styles/globals.css";

// const inter = localFont({
//    src: [{ path: "./fonts/Inter/Inter-Regular.ttf", weight: "400" }],
//    preload: true,
// });

function MyApp({ Component, pageProps }: AppProps) {
   return (
      <main>
         {/* <style jsx global>{`
            html {
               font-family: ${inter.style.fontFamily};
            }
         `}</style> */}
         <Component {...pageProps} />
      </main>
   );
}

export default MyApp;
