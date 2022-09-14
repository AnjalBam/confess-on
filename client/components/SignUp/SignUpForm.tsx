import React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';

import InputField from 'components/common/Input';
import Button from 'components/common/Button';

import { loginInitialData as initialValues } from 'constant';
import { SignUpFormProps } from './SignUp.types';

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSubmit }) => {
    const signUpFormSchema = object().shape({
        fullName: string().required('Full name is required'),
        email: string().email('Invalid email.').required('Email is required.'),
        password: string()
            .required('Password is required.')
            .min(8, 'Password must be at least 8 characters.'),
        bio: string(),
        confirmPassword: string()
            .required('Password is required.')
            .min(8, 'Password must be at least 8 characters.')
            .test('passwords-match', 'Passwords must match', function (value) {
                return this.parent.password === value;
            }),
        username: string().required('Username is required.'),
    });

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={signUpFormSchema}>
            {({ isSubmitting, isValid }) => (
                <Form>
                    <InputField
                        name="fullName"
                        type="text"
                        label="Full Name"
                        placeholder="eg. John Doe"
                    />
                    <InputField
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="eg. john@email.com"
                    />
                    <InputField
                        name="username"
                        type="text"
                        label="Username"
                        placeholder="iamjohn"
                    />
                    <InputField
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                    />
                    <InputField
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        placeholder="Confirm password"
                    />
                    <InputField
                        name="bio"
                        type="text"
                        label="Bio"
                        placeholder="Introduce yourself"
                    />

                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={!isValid}
                    >
                        {isSubmitting ? "Signing in..." : "Register"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default SignUpForm;
