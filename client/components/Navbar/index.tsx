import React from 'react';

import Link from 'next/link';
import Wrapper from 'components/Wrapper';
import Logo from 'components/common/Icons/Logo';
import { colors } from 'constant/colors';
import { routes } from 'constant/routes';

const NavBar = () => {
    return (
        <div className="bottom-bordered fixed top-0 left-0 right-0 bg-white z-50">
            <Wrapper>
                <nav className="nav mx-auto flex items-center justify-between px-4 pt-1 pb-2  text-slate-700 text-center">
                    <Link href={routes.home} className="cursor-pointer">
                        <div className="logo-wrapper flex items-end text-2xl font-bold mx-auto color-primary">
                            <Logo
                                color={colors.primary}
                                className="cursor-pointer"
                            />
                            <h6 className="font-title cursor-pointer">
                                ConfessOn
                            </h6>
                        </div>
                    </Link>
                    {/* <ul className="links-wrapper flex items-center">
                    <li className="block hover:underline mr-3 text-inherit">
                        <Link href={"#"}>Register</Link>{" "}
                    </li>
                    <li className="block mr-3 hover:underline text-inherit">
                        <Link href={"#"}>SignUp</Link>
                    </li>
                </ul> */}
                </nav>
            </Wrapper>
        </div>
    );
};

export default NavBar;
