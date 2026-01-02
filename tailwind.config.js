/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // 外部ディレクトリにある子アプリのスタイルも反映させるために追加
    "../voca-scan-react-v3/src/**/*.{js,ts,jsx,tsx}",
    "../OtherApp/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}