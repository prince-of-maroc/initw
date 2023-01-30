#!/usr/bin/env node

const { exec } = require("child_process");
const builder = process.argv[2];

/* 
      Define File Templates
                                */
// Universal
const cssIndex =
  "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n";

// For Create React App
const craConfig =
  "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n\tcontent: [\n\t\t'./src/**/*.{js,jsx,ts,tsx}',\n\t],\n\ttheme: {\n\t\textend: {},\n\t},\n\tplugins: [],\n}";

// For Vite
const viteConfig =
  "/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n\tcontent: [\n\t\t'./src/**/*.{js,jsx,ts,tsx}',\n\t\t'./index.html',\n\t],\n\ttheme: {\n\t\textend: {},\n\t},\n\tplugins: [],\n}";
const postConfig =
  "module.exports = {\n\tplugins: {\n\t\ttailwindcss: {},\n\n\t\tautoprefixer: {},\n\t},};";
/*
        End of File Template Section
                                            */

/* Bash Script */
function getBashScript(projectBuilder) {
  let bashScript = null;

  if (projectBuilder == "cra") {
    // Create React App
    bashScript = `npm i -D tailwindcss && echo "${craConfig}" > tailwind.config.js && echo "${cssIndex}" | cat - ./src/index.css > temp.css && mv temp.css ./src/index.css`;
  } else if (builder == "vite") {
    // Vite
    bashScript = `npm i -D tailwindcss postcss autoprefixer && echo "${viteConfig}" > tailwind.config.cjs && echo "${postConfig}" > postcss.config.cjs && echo "${cssIndex}" | cat - ./src/index.css > temp.css && mv temp.css ./src/index.css`;
  }
  return bashScript;
}

const bashScript = getBashScript(builder);
if (bashScript) {
  exec(bashScript, () => {
    console.log("\n\nTailwindCSS is now ready to use!\n\n");
  });
} else {
  exec("echo", () => {
    console.log(
      "\nYou did not add a build-tool argument. Vite and Create-React-App are the supported build-tools. \n\nPlease run either of the following:\nnpx initw vite\nnpx initw cra\n"
    );
  });
}
