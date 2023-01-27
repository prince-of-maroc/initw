#!/usr/bin/env node

var { exec } = require("child_process");

const twConfig =
  "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n\tcontent: [\n\t\t'./src/**/*.{js,jsx,ts,tsx}',\n\t],\n\ttheme: {\n\t\textend: {},\n\t},\n\tplugins: [],\n}";

const twInput =
  "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n";

exec(
  `npm i -D tailwindcss && echo "${twConfig}" > tailwind.config.js && echo "${twInput}" | cat - ./src/index.css > temp.css && mv temp.css ./src/index.css`,
  () => {
    console.log("\n\nTailwindCSS is now ready to use!\n\n");
  }
);
