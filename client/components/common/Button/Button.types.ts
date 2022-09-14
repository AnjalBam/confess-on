export type ButtonProps = {
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: 'button' | 'submit' | 'reset';
    isLoading?: boolean;
    primary?: boolean;
    secondary?: boolean;
    success?: boolean;
    danger?: boolean;
    small?: boolean;
};
