import routes from "constant/routes";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className={styles.container}>
            <Head>
                <title>ConfessOn</title>
            </Head>
            <main>
                <Link href={routes.login}>
                    <Button>Login</Button>
                </Link>
                <Button
                    isLoading={isLoading}
                    onClick={() => {
                        toast.error('Oops!!')
                    }}
                >
                    Click me
                </Button>
            </main>
        </div>
    );
};

export default Home;
