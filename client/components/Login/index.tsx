import React from "react";
import { LoginProps } from "./Login.types";
import LoginForm from "./LoginForm";

import { loginInitialData } from "constant";
import AuthenticationService from "services/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

import { Cookies } from "react-cookie";
import useUser from "hooks/useUser";

const cookies = new Cookies();

const Login: React.FC<LoginProps> = (props) => {
    const authService = new AuthenticationService();
    const router = useRouter();

    const { isLoggedIn } = useUser();

    if (isLoggedIn) {
        toast.success("You are already logged in!");
        router.push("/");
    }

    const handleSubmit = async (values: typeof loginInitialData) => {
        const res = await authService.login(values);

        if (res.success) {
            const {
                data: { message, data },
            } = res;
            if (data) {
                data.token && cookies.set("token", data.token, { path: "/" });
            }
            toast.success(message);
            router.push("/");
        } else {
            toast.error(res.error.message || res.error.toString());
        }
    };
    return (
        <div
            data-cy="login"
            className="login-wrapper xl:w-4/12 lg:w-5/12 md:w-6/12 sm: w-full mx-auto rounded shadow-sm px-4 py-8 mt-4"
        >
            <div className="login-header text-center pb-4">
                <h1 className="text-3xl font-bold font-title color-primary">
                    Login
                </h1>
                <p className="text-gray-500">Welcome Back. Please login.</p>
            </div>
            <LoginForm handleSubmit={handleSubmit} />
        </div>
    );
};

export default Login;
