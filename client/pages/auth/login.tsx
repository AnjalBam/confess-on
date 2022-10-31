import Login from 'components/Login';
import { NextPage } from 'next';
import Head from 'next/head';

import AuthenticationService from 'services/auth';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

import { loginInitialData } from 'constant';

import { Cookies } from 'react-cookie';
import React from 'react';
import useQuery from 'hooks/useQuery';
import { AuthContext } from 'context/auth-context';
import DefaultLayout from 'components/Layouts/DefaultLayout';

const cookies = new Cookies();

const LoginPage: NextPage = () => {
    const authService = new AuthenticationService();
    const router = useRouter();

    const nextRedirectUrl: string | undefined = router.query.next?.toString();

    // const { isLoggedIn } = useUser();
    const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
    const { dispatchRequest } = useQuery();

    if (isLoggedIn) {
        toast.success('You are already logged in!');
        router.push(nextRedirectUrl || '/');
    }

    const handleSubmit = async (values: typeof loginInitialData) => {
        const { data, error } = await dispatchRequest(
            authService.login,
            values
        );

        if (error) {
            toast.error(
                error?.response?.data?.message ||
                    error.message.toString() ||
                    error.toString()
            );
            return;
        }

        const { message, data: userData } = data;

        const { token, ...restData } = userData;

        if (token) {
            cookies.set('userData', restData, { path: '/' });
            cookies.set('token', token, { path: '/' });
            setIsLoggedIn(true);
            toast.success(message + ` as ${userData?.username}`);
            router.push(nextRedirectUrl || '/');
            return;
        }
        toast.error('Some error occurred. Please try again.');
    };
    return (
        <DefaultLayout>
            <Head>
                <title>Login | ConfessOn</title>
            </Head>
            <section>
                <Login handleSubmit={handleSubmit} />
            </section>
        </DefaultLayout>
    );
};

export default LoginPage;
