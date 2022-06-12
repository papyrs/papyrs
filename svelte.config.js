import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import {readFileSync} from 'fs';
import preprocess from 'svelte-preprocess';
import {fileURLToPath} from 'url';

const prod = process.env.NODE_ENV === 'production';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const {version} = JSON.parse(json);

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: {
      plugins: [autoprefixer]
    }
  }),

  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false
    },
    prerender: {
      default: true
    },
    vite: {
      define: {
        VITE_APP_VERSION: JSON.stringify(version)
      }
    },
    ...(prod && {
      csp: {
        directives: {
          'default-src': ['none'],
          'img-src': [
            'self',
            'data:',
            'blob:',
            'https://cdn.papy.rs',
            'https://media.tenor.com/',
            'https://images.unsplash.com/',
            'https://*.raw.ic0.app'
          ],
          'manifest-src': ['self'],
          'style-src': ['self', 'unsafe-inline', 'https://cdn.papy.rs'],
          'font-src': ['self', 'https://cdn.papy.rs'],
          'script-src': [
            'self',
            'unsafe-eval',
            'https://cdn.papy.rs/',
            'https://tuwbw-byaaa-aaaad-qblpq-cai.raw.ic0.app/'
          ],
          'connect-src': [
            'blob',
            'https://ic0.app',
            'https://*.raw.ic0.app',
            'https://us-central1-unsplash-proxy.cloudfunctions.net/',
            'https://api.tenor.com/',
            'https://images.unsplash.com/',
            'https://raw.githubusercontent.com/papyrs/',
            'https://app.papy.rs/_app/version.json'
          ],
          'upgrade-insecure-requests': true,
          'child-src': ['self', 'blob:', 'data:']
        }
      }
    })
  }
};

export default config;
