import React from "react";
import { Field, Formik, Form } from "formik";
import { object, string } from "yup";
import { LoginFormProps } from "./LoginForm.types";

import InputField from "components/common/Input";
import Button from "components/common/Button";

import { loginInitialData as initialValues } from "constant";

const LoginForm: React.FC<LoginFormProps> = ({handleSubmit}) => {
    const loginFormSchema = object().shape({
        email: string().email("Invalid email.").required("Email is required."),
        password: string().required("Password is required.").min(8, "Password must be at least 8 characters."),
    });
    
    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={loginFormSchema}
        >
            {({ isSubmitting, isValid }) => (
                <Form>
                    <InputField name="email" placeholder="Enter your email" />
                    <InputField
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                    />
                    <Button
                        type="submit"
                        isLoading={isSubmitting}
                        disabled={!isValid}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default LoginForm;
