import adapter from '@sveltejs/adapter-static';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';

const prod = process.env.NODE_ENV === 'production';

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
    adapter: adapter({
      fallback: 'index.html'
    }),
    serviceWorker: {
      register: false
    },
    ...(prod && {
      csp: {
        directives: {
          'default-src': ['none'],
          'img-src': [
            'self',
            'data:',
            'blob:',
            'https://cdn.deckdeckgo.com',
            'https://media.tenor.com/',
            'https://images.unsplash.com/',
            'https://*.raw.ic0.app',
            'https://*.raw.icp0.io'
          ],
          'manifest-src': ['self'],
          'style-src': ['self', 'unsafe-inline', 'https://cdn.deckdeckgo.com'],
          'font-src': ['self', 'https://cdn.deckdeckgo.com'],
          'script-src': [
            'self',
            'unsafe-eval',
            'https://cdn.deckdeckgo.com/',
            'https://tuwbw-byaaa-aaaad-qblpq-cai.raw.ic0.app/',
            'https://tuwbw-byaaa-aaaad-qblpq-cai.raw.icp0.io/',
            '{{EXTRA_SHAS}}'
          ],
          'connect-src': [
            'blob:',
            'https://ic0.app',
            'https://icp0.io',
            'https://*.raw.ic0.app',
            'https://*.raw.icp0.io',
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
