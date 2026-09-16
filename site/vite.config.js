import {defineConfig} from 'vite';
import {resolve} from 'path';
import {readdirSync} from 'fs';

const digitalDir = resolve(__dirname, 'digital');
const digitalFiles = readdirSync(digitalDir).filter(f => f.endsWith('.html'));

const input = {
  main: resolve(__dirname, 'index.html'),
  privacy: resolve(__dirname, 'privacy.html'),
  terms: resolve(__dirname, 'terms.html'),
};

digitalFiles.forEach(file => {
  const name = file.replace('.html', '');
  input[`digital/${name}`] = resolve(__dirname, 'digital', file);
});

export default defineConfig({
  appType: 'mpa',
  server: {
    host: '0.0.0.0'
  },
  build: {
    rollupOptions: {
      input
    }
  }
});
