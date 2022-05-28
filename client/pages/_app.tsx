import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
