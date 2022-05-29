import React from "react";
import { LoginProps } from "./Login.types";
import LoginForm from "./LoginForm";

const Login: React.FC<LoginProps> = ({ handleSubmit }) => {
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
