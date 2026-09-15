import { resolve } from 'path'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import build from '@hono/vite-build/cloudflare-workers'
import { cloudflareAdapter } from '@hono/vite-dev-server/cloudflare'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(async ({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        tsconfigPaths({ root: './' }),
        tailwindcss(),
      ],
      esbuild: { jsxImportSource: 'hono/jsx/dom' },
      build: {
        lib: {
          entry: resolve(
            __dirname,
            'src/pages/client.tsx',
          ),
          name: 'client',
          fileName: 'static/client',
        },
      },
    }
  }

  return {
    plugins: [
      tsconfigPaths({ root: './' }),
      tailwindcss(),
      build({ entry: 'src/index.tsx' }),
      devServer({
        adapter: cloudflareAdapter,
        entry: 'src/index.tsx',
      }),
    ],
    resolve: {
      alias: {
        // `router` means src/router.tsx, resolved via tsconfig baseUrl "./src".
        // When this fork is checked out as a git submodule inside a monorepo,
        // Node resolution walks up past services/ and finds a HOISTED npm
        // package literally named `router` (a CommonJS Express dep pulled in
        // transitively by express/hono/react-router/wrangler) before it gets to
        // src/. Boot then dies with:
        //   Named export 'loadRouters' not found. The requested module 'router'
        //   is a CommonJS module...
        // A Vite alias is applied before node_modules resolution, so src wins.
        // Standalone checkouts are unaffected — there is no parent node_modules
        // to shadow anything. `router` is currently the only name under src/
        // that collides; re-check if new top-level modules are added there.
        router: resolve(
          __dirname,
          'src/router.tsx',
        ),
      },
    },
  }
})
