import routes from "constant/routes";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import styles from "../styles/Home.module.scss";
import axios from "utils/axios";
const Home: NextPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const fetchData = async () => {
        try {
            const { data } = await axios.get("/connection-test/");
            console.log(data);
            toast.success(data.message);
            return data;
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || error.toString());
            return error;
        }
    };
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
                        toast.loading("Testing connection...", {
                            duration: 1000,
                        });
                        fetchData().then((data) => console.log(data));
                    }}
                >
                    Test connection
                </Button>
            </main>
        </div>
    );
};

export default Home;
