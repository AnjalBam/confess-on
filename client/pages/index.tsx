import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Button from "../components/Button";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className={styles.container}>
            <Head>
                <title>ConfessOn</title>
            </Head>
            <main>
                <Button
                    isLoading={isLoading}
                    onClick={() => {
                        setIsLoading(!isLoading);
                    }}
                >
                    Click me
                </Button>
            </main>
        </div>
    );
};

export default Home;
