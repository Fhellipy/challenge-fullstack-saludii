import dns from 'dns'
import { resolve } from 'node:path'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'

import redwood from '@redwoodjs/vite'

// So that Vite will load on localhost instead of `127.0.0.1`.
// See: https://vitejs.dev/config/server-options.html#server-host.
dns.setDefaultResultOrder('verbatim')

const viteConfig: UserConfig = {
  plugins: [redwood()],
  resolve: {
    alias: [
      {
        find: '@pages',
        replacement: resolve('./src/pages'),
      },
      {
        find: '@modules',
        replacement: resolve('./src/modules'),
      },
      {
        find: '@routes',
        replacement: resolve('./src/routes'),
      },
    ],
  },
}

export default defineConfig(viteConfig)
