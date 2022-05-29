import Login from "components/Login";
import { NextPage } from "next";
import Head from "next/head";

import AuthenticationService from "services/auth";
import { useRouter } from "next/router";
import useUser from "hooks/useUser";
import toast from "react-hot-toast";

import { loginInitialData } from "constant";

import { Cookies } from "react-cookie";
import React from "react";

const cookies = new Cookies();

const LoginPage: NextPage = () => {
    const authService = new AuthenticationService();
    const router = useRouter();

    const nextRedirectUrl:string|undefined = router.query.next?.toString();

    const { isLoggedIn } = useUser();

    if (isLoggedIn) {
        toast.success("You are already logged in!");
        router.push(nextRedirectUrl || "/");
    }

    const handleSubmit = async (values: typeof loginInitialData) => {
        const res = await authService.login(values);

        if (res.success) {
            const {
                data: { message, data },
            } = res;
            if (data?.token) {
                cookies.set("token", data.token, { path: "/" });
                toast.success(message + ` as ${data?.username}`);
                router.push(nextRedirectUrl || "/");
                return;
            }
            toast.error('Some error occurred. Please try again.')
        } else {
            toast.error(
                res.error?.response?.data?.message ||
                    res.error.message.toString() ||
                    res.error.toString()
            );
        }
    };
    return (
        <div>
            <Head>
                <title>Login | ConfessOn</title>
            </Head>
            <section>
                <Login handleSubmit={handleSubmit} />
            </section>
        </div>
    );
};

export default LoginPage;
