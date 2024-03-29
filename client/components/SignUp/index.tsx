import { routes } from 'constant';
import Link from 'next/link';
import React from 'react';
import { SignUpProps } from './SignUp.types';
import SignUpForm from './SignUpForm';

const SignUp: React.FC<SignUpProps> = ({ handleSubmit }) => {
    return (
        <div
            data-cy="signup"
            className="signup-wrapper shadowed xl:w-4/12 lg:w-5/12 md:w-6/12 sm: w-full mx-auto rounded shadow-sm px-4 py-8 mt-4">
            <div className="signup-header text-center pb-4">
                <h1 className="text-3xl font-bold font-title color-primary">
                    Sign Up
                </h1>
                <p className="text-gray-500">
                    Get Started. Fill out your details.
                </p>
            </div>
            <SignUpForm handleSubmit={handleSubmit} />
            <Link href={routes.login} className="mt-4 text-slate-500">
                <a href="">
                    Already have an account? <strong>LogIn</strong>
                </a>
            </Link>
        </div>
    );
};

export default SignUp;
