// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
// https://astro.build/config
export default defineConfig({
	site: 'http://localhost:4321',
	integrations: [mdx(), sitemap(), sanity({
		projectId: 'amds2shj',
		dataset: 'production',
		apiVersion: '2024-01-19',
		useCdn: true
	  })],
})
