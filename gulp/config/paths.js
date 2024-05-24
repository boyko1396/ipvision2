import path from 'path';

const projectDirName = path.basename(path.resolve());
const buildFolder = `./dist/assets`;
const srcFolder = `./src/assets`;
const buildFolderHTML = `./dist`;
const srcFolderHTML = `./src`;

const filePaths = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolderHTML}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    static: `${buildFolder}/static/`,
  },
  src: {
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/images/**/*.svg`,
    scss: `${srcFolder}/scss/style.scss`,
    html: `${srcFolderHTML}/*.html`,
    static: `${srcFolder}/static/**/*.*`,
    svgIcons: `${srcFolder}/images/icons/*.svg`,
  },
  watch: {
    js: `${srcFolder}/js/**/*.js`,
    scss: `${srcFolder}/scss/**/*.scss`,
    html: `${srcFolderHTML}/**/*.html`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    static: `${srcFolder}/static/**/*.*`,
  },
  clean: buildFolderHTML,
  buildFolder: buildFolderHTML,
  srcFolder: srcFolderHTML,
  projectDirName,
  ftp: '', // Path to the necessary folder on the remote server. Gulp will automatically add the project folder name
};

export { filePaths };