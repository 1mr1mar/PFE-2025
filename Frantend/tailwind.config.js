/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      colors: {
            gold: '#C9A54E', 
            ziti:'#0B1315',
            'yellow-gold1': '#C9A54E',
            'green-khzy': '#1A2C31',
            'green-ziti': '#0B1315',
          },
      extend: {
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
      },
    },
    plugins: [],
  };
  