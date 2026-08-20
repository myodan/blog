import cloudflare from "@astrojs/cloudflare";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import {
	transformerNotationDiff,
	transformerNotationHighlight,
	transformerNotationWordHighlight,
} from "@shikijs/transformers";
import tailwindcss from "@tailwindcss/vite";
import {
	defineConfig,
	envField,
	fontProviders,
	svgoOptimizer,
} from "astro/config";
import rehypeCallouts from "rehype-callouts";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import config from "./astro-paper.config";
import { transformerFileName } from "./src/utils/transformers/fileName";

export default defineConfig({
	site: config.site.url,
	integrations: [
		mdx(),
		sitemap({
			filter: (page) =>
				config.features?.showArchives !== false || !page.endsWith("/archives/"),
		}),
	],
	i18n: {
		locales: ["ko"],
		defaultLocale: "ko",
		routing: {
			prefixDefaultLocale: false,
		},
	},
	markdown: {
		processor: unified({
			remarkPlugins: [
				remarkToc,
				[remarkCollapse, { test: "Table of contents" }],
			],
			rehypePlugins: [rehypeCallouts],
		}),
		shikiConfig: {
			themes: { light: "min-light", dark: "night-owl" },
			defaultColor: false,
			wrap: false,
			transformers: [
				transformerFileName({ style: "v2", hideDot: false }),
				transformerNotationHighlight(),
				transformerNotationWordHighlight(),
				transformerNotationDiff({ matchAlgorithm: "v3" }),
			],
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
	fonts: [
		{
			name: "Pretendard OG",
			cssVariable: "--font-pretendard-og",
			provider: fontProviders.local(),
			fallbacks: [],
			optimizedFallbacks: false,
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/pretendard/og/Pretendard-Regular.woff"],
						weight: 400,
						style: "normal",
					},
					{
						src: ["./src/assets/fonts/pretendard/og/Pretendard-Bold.woff"],
						weight: 700,
						style: "normal",
					},
				],
			},
		},
	],
	env: {
		schema: {
			PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
				access: "public",
				context: "client",
				optional: true,
			}),
		},
	},
	experimental: {
		svgOptimizer: svgoOptimizer(),
	},
	adapter: cloudflare({ prerenderEnvironment: "node" }),
});
