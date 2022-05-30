import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "components/Navbar";
import { Toaster } from "react-hot-toast";
import { colors } from "constant/colors";
import LoadingOnRouteChange from "components/LoadingOnRouteChange";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Toaster
                position="bottom-center"
                gutter={8}
                reverseOrder={false}
                toastOptions={{
                    duration: 4000,

                    style: {
                        background: colors.light,
                        color: colors.dark,
                    },
                }}
            />
            <LoadingOnRouteChange />
            <NavBar />
            <main className="content-wrapper">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
