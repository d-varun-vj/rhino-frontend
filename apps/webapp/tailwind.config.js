/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'rhino-indigo-blue': '#1c4670',
        'rhino-indigo-blue-light': '#496b8d',
        'rhino-energy-green': '#00cf60',
        'rhino-energy-green-light': '#66e3a0',
        white: '#fff',
        'grey-light': '#e6e6fa',
        'grey-dark': '#91a0b1',
        grey: '#666666',
      },
    },
  },
  plugins: [],
};
