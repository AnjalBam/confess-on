import React from 'react';
import NavBar from 'components/Navbar';

const DefaultLayout: React.FC<any> = ({ children }) => {
    return (
        <>
            <NavBar />
            <main className="content-wrapper">{children}</main>
        </>
    );
};

export default DefaultLayout;
