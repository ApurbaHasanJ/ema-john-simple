/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#FF9900",
        
"secondary": "#FFE0B3",
        
"accent": "#ffa342",
        
"neutral": "#21262B",
        
"base-100": "#FDFCFD",
        
"info": "#68B3E8",
        
"success": "#5AD8BF",
        
"warning": "#F8C920",
        
"error": "#FF3030",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
  
}
