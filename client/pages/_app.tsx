import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import NavBar from 'components/Navbar';
import { Toaster } from 'react-hot-toast';
import { colors } from 'constant/colors';
import LoadingOnRouteChange from 'components/LoadingOnRouteChange';
import AuthContextProvider from 'context/auth-context';
import UserContextProvider from 'context/user-context';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <AuthContextProvider>
                <UserContextProvider>
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
                </UserContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default MyApp;
