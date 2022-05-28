import "../styles/globals.scss";
import type { AppProps } from "next/app";
import NavBar from "components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NavBar />
            <main className="content-wrapper">
                <Component {...pageProps} />
            </main>
        </>
    );
}

export default MyApp;
