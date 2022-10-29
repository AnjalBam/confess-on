import React from 'react';
import { colors, routes } from 'constant';
import Logo from 'components/common/Icons/Logo';
import Link from 'next/link';
import useUser from 'hooks/useUser';
import Wrapper from 'components/Wrapper';

const LandingNav = () => {
    const { isLoggedIn } = useUser();
    const links = [
        {
            href: routes.login,
            linkText: 'Login',
        },
        {
            href: routes.signUp,
            linkText: 'Register',
        },
    ];
    return (
        <Wrapper className="fixed top-0 left-0 right-0">
            <nav className="lading-nav flex items-center justify-between py-4">
                <Link href={routes.home} className="cursor-pointer">
                    <div className="flex items-end text-2xl font-bold color-primary">
                        <Logo
                            color={colors.primary}
                            className="cursor-pointer"
                        />
                        <h6 className="font-title cursor-pointer">ConfessOn</h6>
                    </div>
                </Link>
                <div className="links">
                    {!isLoggedIn ? (
                        links.map(link => {
                            return (
                                <Link href={link.href} key={link.href}>
                                    <a className="pr-3 last:pr-0 hover:underline">
                                        {link.linkText}
                                    </a>
                                </Link>
                            );
                        })
                    ) : (
                        <Link href={routes.dashboard}>
                            <a className="pr-3 last:pr-0 hover:underline">
                                Dashboard
                            </a>
                        </Link>
                    )}
                </div>
            </nav>
        </Wrapper>
    );
};

export default LandingNav;
