/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      colors: {
            gold: '#C9A54E', 
            ziti:'#0B1315',
            'yellow-gold1': '#C9A54E',
            'green-khzy': '#1A2C31',
            'green-ziti': '#0B1315',
            'white': '#ffffff',
            'black': '#000000',
            'gold-khzy': '#DDA853',
            'gold-khzy-light': '#F5E3C1',
            'gold-khzy-dark': '#C9A54E',
          },
      extend: {
        backgroundColor: {
          'theme': 'var(--bg-theme)',
        },
        textColor: {
          'theme': 'var(--text-theme)',
        },
        fontFamily: {
            'roboto': ['Roboto', 'sans-serif'],
            custom: ['font1', 'sans-serif'],
          },
          fontWeight: {
            'light': 300,
            'normal': 400,
            'medium': 500,
            'bold': 700,
          },
          letterSpacing: {
            'widest': '0.1em',
          },
          
        animation: {
          fadeIn: "fadeIn 1s ease-in-out",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "translateY(-10px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
        },
        backgroundColor: {
          'theme-light': '#ffffff',
          'theme-dark': '#000000',
        },
        textColor: {
          'theme-light': '#000000',
          'theme-dark': '#F5E3C1',
        },
      },
    },
    plugins: [],
  };
  