import Button from 'components/common/Button';
import Logo from 'components/common/Icons/Logo';
import Wrapper from 'components/Wrapper';
import { colors, routes } from 'constant';
import useUser from 'hooks/useUser';
import Link from 'next/link';
import React from 'react';
import LandingNav from './Nav';

const LandingPage = () => {
    const { isLoggedIn } = useUser();
    return (
        <div className="overflow-hidden relative">
            <div className="absolute -rotate-45 -right-36 -top-20 z-10 hidden md:block">
                <Logo height={800} width={800} className={'rotate-12'} color={`${colors.primary}e0`} />
            </div>
            <Wrapper className="h-screen relative z-20">
                <LandingNav />
                <div className="px-4 flex items-center justify-center h-full">
                    <div className="font-title mx-auto">
                        <h1 className="text-4xl md:text-6xl font-bold">
                            Just let it{' '}
                            <span className="color-primary">out.</span>
                        </h1>
                        <p className="mt-2 md:text-xl">
                            Sometimes, it is just too much. And you just want to
                            let it out.
                            <br />
                            So, Just{' '}
                            <span className="color-primary"> ConfessOn</span>.
                        </p>
                        <Link href={routes.signUp}>
                            <Button className="mt-4" disabled={isLoggedIn}>
                                <span className="font-bold">Register</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default LandingPage;
