/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
      "brandColor":"#62FFB4",
      "firstColor":"#347928",
      "secondColor":"#0866FF",
      "thirdColor":"#3B3D3E",
      "fourthColor":"#FCCD2A"
    },
  },
    container:{
      center:true,
    },
    fontFamily:{
      "poppins":["Poppins", "serif"],
    }
  },
  plugins: [],
}
