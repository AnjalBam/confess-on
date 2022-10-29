import { routes } from 'constant/routes';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import styles from '../styles/Home.module.scss';

import useUser from 'hooks/useUser';
import AuthenticationService from 'services/auth';
import { AuthenticatedService } from 'services';
import LandingPage from 'components/LandingPage';


const Home: NextPage = () => {
    const [isLoading] = useState(false);
    const { isLoggedIn, revalidate } = useUser();
    const fetchData = async () => {
        try {
            const res = await new AuthenticatedService().testConnection();
            toast.success(JSON.stringify(res));
        } catch (error: any) {
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
                <LandingPage />
            </main>
        </div>
    );
};

export default Home;
