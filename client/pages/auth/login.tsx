import Login from "components/Login";
import { NextPage } from "next";
import Head from "next/head";

const LoginPage: NextPage = () => {
    return (
        <div>
            <Head>
                <title>Login | ConfessOn</title>
            </Head>
            <section>
                <Login />
            </section>
        </div>
    );
};

export default LoginPage;
