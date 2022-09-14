import Login from 'components/Login';
import { NextPage } from 'next';
import Head from 'next/head';

import AuthenticationService from 'services/auth';
import { useRouter } from 'next/router';
import useUser from 'hooks/useUser';
import toast from 'react-hot-toast';

import { initialSignupData } from 'constant';

import { Cookies } from 'react-cookie';
import React from 'react';
import useQuery from 'hooks/useQuery';

import SignUp from 'components/SignUp';
import { routes } from 'constant';

const cookies = new Cookies();

const SignUpPage: NextPage = () => {
    const authService = new AuthenticationService();
    const router = useRouter();

    const nextRedirectUrl: string | undefined = router.query.next?.toString();

    const { isLoggedIn } = useUser();
    const { isLoading, dispatchRequest } = useQuery();

    console.log(isLoading);

    if (isLoggedIn) {
        toast.success('You are already logged in!');
        router.push(nextRedirectUrl || '/');
    }

    const handleSubmit = async (values: typeof initialSignupData) => {
        console.log({ values });
        const { data, error } = await dispatchRequest(
            authService.signup,
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

        if (userData) {
            toast.success(message + ` as ${userData?.username}. Please login.`);
            router.push(routes.login);
            return;
        }
        toast.error('Some error occurred. Please try again.');
    };
    return (
        <div>
            <Head>
                <title>SignUp | ConfessOn</title>
            </Head>
            <section>
                <SignUp handleSubmit={handleSubmit} />
            </section>
        </div>
    );
};

export default SignUpPage;
