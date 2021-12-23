import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const SOURCE_FRONT = 'src-frontend/';

// https://vitejs.dev/config/
export default defineConfig({
  root: SOURCE_FRONT,
  build: {
    manifest: true,
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, SOURCE_FRONT, 'index.html'),
        note: resolve(
          __dirname,
          SOURCE_FRONT,
          'note/index.html'
        )
      }
    }
  },
  plugins: [viteClean()]
});

// clean up unused assets
function viteClean() {
  return {
    name: 'vite:clean',
    transformIndexHtml: {
      enforce: 'post',
      transform(html, ctx) {
        // Only use this plugin during build
        if (!ctx || !ctx.bundle) {
          return html;
        }
        // Get the bundle
        for (const [, value] of Object.entries(ctx.bundle)) {
          delete ctx.bundle[value.fileName];
        }
        return html;
      }
    }
  };
}
