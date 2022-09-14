import React from 'react';
import { ButtonProps } from './Button.types';
import { Puff } from 'react-loading-icons';
import { colors } from 'constant/colors';

const Button: React.FC<ButtonProps> = ({
    children,
    primary = false,
    secondary = false,
    isLoading = false,
    success = false,
    danger = false,
    className = '',
    type = 'button',
    disabled = false,
    ...rest
}) => {
    const bgColor = `${
        primary
            ? 'bg-primary'
            : secondary
            ? 'bg-secondary'
            : danger
            ? 'bg-danger'
            : success
            ? 'bg-success'
            : 'bg-primary'
    }`;
    return (
        <button
            data-testid="custom-button"
            type={type}
            className={`${bgColor} rounded-lg shadow transition-all duration-300  px-6 py-2 text-white font-regular flex items-center disabled:bg-slate-400 ${className}`}
            disabled={isLoading || disabled}
            {...rest}>
            {isLoading && (
                <Puff
                    data-testid="spinner"
                    className="pr-2"
                    stroke={'#fff'}
                    speed={2}
                    width={'2rem'}
                    height={'1rem'}
                />
            )}
            <> {children}</>
        </button>
    );
};

export default Button;
