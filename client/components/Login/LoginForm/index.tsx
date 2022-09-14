import React from 'react';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { LoginFormProps } from './LoginForm.types';

import InputField from 'components/common/Input';
import Button from 'components/common/Button';

import { loginInitialData as initialValues } from 'constant';

const LoginForm: React.FC<LoginFormProps> = ({ handleSubmit }) => {
    const loginFormSchema = object().shape({
        email: string().email('Invalid email.').required('Email is required.'),
        password: string()
            .required('Password is required.')
            .min(8, 'Password must be at least 8 characters.'),
    });

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={loginFormSchema}>
            {({ isSubmitting, isValid }) => (
                <Form>
                    <InputField
                        name="email"
                        label="Email Address"
                        placeholder="Enter your email"
                    />
                    <InputField
                        name="password"
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={!isValid}
                        className={!isValid ? 'mt-2' : 'mt-4'}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
