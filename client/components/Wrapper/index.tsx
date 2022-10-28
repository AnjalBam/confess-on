import { userContext } from '../../context/user-context';
import { useEffect, useContext } from 'react';

const Wrapper: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className,
}) => {
    return (
        <div
            className={`xl:container lg:container md:container sm:container mx-auto ${className}`}>
            {children}
        </div>
    );
};

export default Wrapper;
