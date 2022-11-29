import {sveltekit} from '@sveltejs/kit/vite';
import {readFileSync} from 'fs';
import {fileURLToPath} from 'url';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const {version} = JSON.parse(json);

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [sveltekit()],
  define: {
    VITE_APP_VERSION: JSON.stringify(version),
    VITE_IC_FEED_CANISTER_SECRET: JSON.stringify(process.env.FEED_SECRET)
  },
  build: {target: 'es2020'},
  optimizeDeps: {
    esbuildOptions: {target: 'es2020', supported: {bigint: true}}
  }
};

export default config;
