import esbuild from 'esbuild';
import fs from 'fs';

const buffer = fs.readFileSync('./scripts/esbuild.json');
const { functions, alias } = JSON.parse(buffer.toString());

const isNodeModule = (args) => {
  const pathArray = args.path.split('/');
  const firstSplit = pathArray[0];
  if (args.importer) {
    if (firstSplit === '.' || firstSplit === '..') return false;
    const { length } = alias.filter((value) =>  value === firstSplit);
    return !length;
  }
};

const nodeDirectories = (build) => {
  build.onResolve({ filter: /.*/ }, (args) => {
    if (isNodeModule(args)) {
      const path = args.path;
      return { path, external: true };
    }
  });
};

await esbuild.build({
  bundle: true,
  minify: true,
  platform: 'node',
  entryPoints: functions,
  outdir: 'dist/src/',
  outbase: 'src',
  external: ['./node_modules/*'],
  plugins: [
    {
      name: 'node-directories',
      setup: nodeDirectories,
    },
  ],
});
