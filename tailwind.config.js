/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            animation: {
                gradient: 'gradient 3s linear infinite',
                'border-rotate': 'border-rotate 4s linear infinite',
            },
            keyframes: {
                gradient: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                'border-rotate': {
                    '0%': { 'border-color': '#5417d7', transform: 'rotate(0deg)' },
                    '50%': { 'border-color': '#8b5cf6', transform: 'rotate(180deg)' },
                    '100%': { 'border-color': '#5417d7', transform: 'rotate(360deg)' },
                },
            },
        },
    },
    plugins: [],
}