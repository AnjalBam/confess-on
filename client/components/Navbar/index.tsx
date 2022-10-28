import { useContext } from 'react';

import Link from 'next/link';
import Wrapper from 'components/Wrapper';
import Logo from 'components/common/Icons/Logo';
import { colors } from 'constant/colors';
import { routes } from 'constant/routes';
import { userContext } from 'context/user-context';

const NavBar = () => {
    const { user } = useContext(userContext);
    // console.log(user);
    return (
        <div className="bottom-bordered fixed top-0 left-0 right-0 bg-white z-50">
            <Wrapper>
                <nav
                    className={`nav flex items-center ${
                        user ? 'justify-between' : 'justify-center'
                    } px-4 pt-1 `}>
                    {/* <ul className="links-wrapper flex items-center">
                    <li className="block hover:underline mr-3 text-inherit">
                        <Link href={"#"}>Register</Link>{" "}
                    </li>
                    <li className="block mr-3 hover:underline text-inherit">
                        <Link href={"#"}>SignUp</Link>
                    </li>
                </ul> */}
                    <Link href={routes.home} className="cursor-pointer">
                        <div className="flex items-end text-2xl font-bold color-primary">
                            <Logo
                                color={colors.primary}
                                className="cursor-pointer"
                            />
                            <h6 className="font-title cursor-pointer">
                                ConfessOn
                            </h6>
                        </div>
                    </Link>
                    {user && (
                        <div>
                            <h6 className="font-bold">
                                {user.username}
                            </h6>
                        </div>
                    )}
                </nav>
            </Wrapper>
        </div>
    );
};

export default NavBar;
