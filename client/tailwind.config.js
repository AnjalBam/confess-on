const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            color: {
                primary: '#6B4BFF',
                secondary: '#918EAE',
                dark: '#231D5C',
                ...defaultTheme.colors,
            },
        },
    },
    plugins: [],
};
