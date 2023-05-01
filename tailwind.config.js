/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        konkhmer: ['"Konkhmer Sleokchher"'],
        goldman: ['"Goldman"'],
        poppins: ['"Poppins"']
      }
    },
  },
  plugins: [],
}