// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';


// https://astro.build/config
export default defineConfig({
    integrations: [
    // Your existing integrations
  ],
  site: 'https://sinaares.github.io/astro-modern-site/',
  vite: {
    plugins: [tailwindcss()]
  }
});