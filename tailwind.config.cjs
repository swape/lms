/** @type {import('tailwindcss').Config} */


module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
	darkMode: 'class',
	daisyui: {
		styled: true,
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'dark',
		themes: ['light', 'dark']
	}
}
