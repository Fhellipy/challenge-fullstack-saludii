import dns from 'dns'

import type { UserConfig } from 'vite'
import { defineConfig } from 'vite'
import { resolve } from "node:path";

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
        find: '@components',
        replacement: resolve('./src/components'),
      },
    ],
  },
}

export default defineConfig(viteConfig)
