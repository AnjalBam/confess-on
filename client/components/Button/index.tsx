import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
    children,
    primary = true,
    secondary = false,
    isLoading = false,
    success = false,
    danger = false,
    className = "",
    ...rest
}) => {
    const bgColor = `${
        primary
            ? "bg-primary"
            : secondary
            ? "bg-secondary"
            : success
            ? "bg-success"
            : danger
            ? "bg-danger"
            : "bg-primary"
    }`;
    return (
        <button className={`${className} ${bgColor}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
