/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                shark: {
                    deep: '#f4f7fb',
                    dark: '#ffffff',
                    light: '#e8f0fe',
                    accent: '#2563eb',
                    fluid: '#0ea5e9',
                    silver: '#64748b',
                },
                premium: {
                    gold: '#f59e0b',
                    neon: '#06b6d4',
                }
            },
            fontFamily: {
                sora: ['Sora', 'sans-serif'],
                outfit: ['Outfit', 'sans-serif'],
            },
            animation: {
                'fluid-bg': 'fluid 10s ease infinite',
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
            },
            keyframes: {
                fluid: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
