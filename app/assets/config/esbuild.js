const path = require('path');
const sasLoader = require('esbuild-sass-plugin');

require("esbuild").build({
  entryPoints: ["application.js"],
  bundle: true,
  sourcemap: true,
  minify: true,
  outdir: path.join(process.cwd(), "app/assets/builds"),
  absWorkingDir: path.join(process.cwd(), "app/javascript"),
  // watch: !(process.env.NODE_ENV === 'production' || process.env.CI),  // watch only in development
  watch: true,   // si no funciona en produccion lo de arriba comentar el watch
  loader: { '.js': 'jsx', '.png': 'file', '.jpg': 'file', '.jpeg': 'file', '.gif': 'file', '.svg': 'file', '.ttf': 'file', '.woff': 'file', '.woff2': 'file', '.eot': 'file', '.otf': 'file' },
  publicPath: '/assets',
  target: 'es6',
  // custom plugins will be inserted is this array
  plugins: [sasLoader.sassPlugin()],
}).catch(() => process.exit(1));

// console.log(`Esbuild is running...:::::: ${process.env}`);