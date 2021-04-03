- installed SvelteKit

  1. pnpm init svelte@next
  1. pnpm i

- installed storybook:

  1. npx sb init (pnpx would not work)

* installed tailwindcss:

  1. pnpm i -D @tailwindcss/jit autoprefixer postcss postcss-load-config postcss-preset-env tailwindcss
  1. added tailwind.config.cjs (this was borrowed. Need to review):

  ```javascript
  const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
  const defaultTheme = require('tailwindcss/defaultTheme');

  module.exports = {
  	purge: {
  		content: ['./src/**/*.html', './src/**/*.svelte'],
  		options: {
  			defaultExtractor: (content) => [
  				...tailwindExtractor(content),
  				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
  				...[...content.matchAll(/(?:class:)\*([\w\d-/:%.]+)/gm)].map(
  					([_match, group, ..._rest]) => group,
  				),
  			],
  			keyframes: true,
  		},
  	},
  	darkMode: 'class',
  	theme: {},
  	variants: {
  		extend: {},
  	},
  	plugins: [],
  };
  ```

  1. added postcss.config.cjs (this was borrowed. Need to review):

  ```javascript
  const postcssPresetEnv = require('postcss-preset-env');
  const tailwindCSS = require('@tailwindcss/jit');
  // ^ Just for now, will merge to tailwindcss. Check https://blog.tailwindcss.com/just-in-time-the-next-generation-of-tailwind-css
  const autoprefixer = require('autoprefixer');

  module.exports = {
  	plugins: [
  		postcssPresetEnv({
  			stage: 4,
  			features: {
  				'nesting-rules': true,
  			},
  		}),

  		tailwindCSS(),
  		autoprefixer,
  	],
  };
  ```

  1. Added tailwind imports to app.css ($layout.svelte imports this by default from the project template. this will make tailwind available globally):

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
