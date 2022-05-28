import React from "react";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
    children,
    primary = false,
    secondary = false,
    isLoading = false,
    success = false,
    danger = false,
    className = "",
    type="button",
    ...rest
}) => {
    const bgColor = `${
        primary
            ? "bg-primary"
            : secondary ? "bg-secondary" : danger ? "bg-danger" : success ? "bg-success" : "bg-primary"
    }`;
    return (
        <button data-testid='custom-button' type={type} className={`${bgColor} ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
