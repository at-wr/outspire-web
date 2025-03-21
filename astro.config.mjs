// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react()],
  output: 'server',
  adapter: netlify({
    // Netlify adapter options if needed
    // You can customize how the adapter works here
    // For example:
    // edgeMiddleware: true // for using Netlify Edge Functions
  }),
});