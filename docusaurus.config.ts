import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
	title: "水土曜來了筆記站",
	tagline: "歡迎來到水土曜來了筆記站",
	favicon: "img/wed_sat_icon.svg",
	// Set the production url of your site here
	url: "https://note.wedsatcoming.com/",
	// Set the /<baseUrl>/ pathname under which your site is served
	// For GitHub pages deployment, it is often '/<projectName>/'
	baseUrl: "/",

	// GitHub pages deployment config.
	// If you aren't using GitHub pages, you don't need these.
	organizationName: "wedsatcoming", // Usually your GitHub org/user name.
	projectName: "note", // Usually your repo name.

	onBrokenLinks: "throw",
	onBrokenMarkdownLinks: "warn",

	// Even if you don't use internationalization, you can use this field to set
	// useful metadata like html lang. For example, if your site is Chinese, you
	// may want to replace "en" with "zh-Hans".
	i18n: {
		defaultLocale: "zh-Hant",
		locales: ["zh-Hant"],
	},

	markdown: {
		mermaid: true,
	},
	themes: ["@docusaurus/theme-mermaid"],
	presets: [
		[
			"classic",
			{
				docs: {
					sidebarPath: "./sidebars.ts",
					// Please change this to your repo.
					// Remove this to remove the "edit this page" links.
					showLastUpdateTime: true,
				},
				theme: {
					customCss: "./src/css/custom.css",
				},
			} satisfies Preset.Options,
		],
	],

	themeConfig: {
		// Replace with your project's social card
		image: "img/banner-night.jpg",
		metadata: [
			{ name: "algolia-site-verification", content: "A8845A31B4D03839" },
			{
				name: "description",
				content:
					"水土曜來了筆記站 - 分享學習筆記、技術文件與開發經驗的知識分享平台",
			},
			{
				name: "keywords",
				content: "學習筆記，技術文件，前端開發，React,Vue，程式設計，開發經驗",
			},
			{ property: "og:title", content: "水土曜來了筆記站" },
			{
				property: "og:description",
				content:
					"水土曜來了筆記站 - 分享學習筆記、技術文件與開發經驗的知識分享平台",
			},
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: "https://note.wedsatcoming.com/" },
			{
				property: "og:image",
				content: "https://note.wedsatcoming.com/img/banner-night.jpg",
			},
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: "水土曜來了筆記站" },
			{
				name: "twitter:description",
				content:
					"水土曜來了筆記站 - 分享學習筆記、技術文件與開發經驗的知識分享平台",
			},
			{
				name: "twitter:image",
				content: "https://note.wedsatcoming.com/img/banner-night.jpg",
			},
		],
		mermaid: {
			theme: { light: "forest", dark: "dark" },
		},
		algolia: {
			// Algolia 提供的應用程式 ID
			appId: "HVMC43GRZZ",

			// 公開 API 金鑰：可以安全地提交到版本控制
			apiKey: "c649c2e625d78e5389116c71f36d0e16",

			// 索引名稱
			indexName: "wedsatcoming",

			// 可選：啟用上下文搜尋（預設為 true）
			contextualSearch: true,

			// 可選：搜尋頁面路徑（預設啟用，設為 false 可停用）
			searchPagePath: "search",

			// 可選：其他 Algolia 搜尋參數
			searchParameters: {},

			// 可選：是否啟用洞察功能（預設為 false）
			insights: false,
		},

		navbar: {
			title: "水土曜來了筆記",
			logo: {
				alt: "水土曜來了筆記 Logo",
				src: "img/wed_sat_icon.svg",
			},
			items: [
				{
					type: "docSidebar",
					sidebarId: "tutorialSidebar",
					position: "left",
					label: "筆記",
				},
				{
					href: "/docs/tags",
					label: "Tags",
					position: "left",
				},
				{
					href: "https://wedsatcoming.com",
					label: "我的部落格站",
					position: "left",
				},
			],
		},
		footer: {
			style: "light",
			links: [
				{
					title: "Docs",
					items: [
						{
							label: "Tutorial",
							to: "/docs/intro",
						},
					],
				},
				{
					title: "Community",
					items: [
						{
							label: "Stack Overflow",
							href: "https://stackoverflow.com/questions/tagged/docusaurus",
						},
						{
							label: "Discord",
							href: "https://discordapp.com/invite/docusaurus",
						},
						{
							label: "Twitter",
							href: "https://twitter.com/docusaurus",
						},
					],
				},
				{
					title: "More",
					items: [
						{
							label: "GitHub",
							href: "https://github.com/facebook/docusaurus",
						},
					],
				},
			],
			copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
		colorMode: {
			defaultMode: "dark",
			disableSwitch: false,
			respectPrefersColorScheme: false,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
