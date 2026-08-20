import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
	site: {
		url: "https://blog.myodan.me/",
		title: "토끼굴",
		description: "묘단의 블로그입니다.",
		author: "묘단",
		profile: "https://myodan.me",
		ogImage: "default-og.jpg",
		lang: "ko",
		timezone: "Asia/Seoul",
		dir: "ltr",
	},
	posts: {
		perPage: 4,
		perIndex: 4,
		scheduledPostMargin: 15 * 60 * 1000,
	},
	features: {
		lightAndDarkMode: true,
		dynamicOgImage: true,
		showArchives: true,
		showBackButton: true,
		editPost: {
			enabled: true,
			url: "https://github.com/myodan/blog/edit/main/",
		},
		search: "pagefind",
	},
	socials: [
		{ name: "github", url: "https://github.com/myodan" },
		{ name: "x", url: "https://x.com/myodan_x" },
		{ name: "linkedin", url: "https://www.linkedin.com/in/myodan" },
		{ name: "mail", url: "mailto:myodan@pm.me" },
	],
	shareLinks: [
		{ name: "whatsapp", url: "https://wa.me/?text=" },
		{ name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
		{ name: "x", url: "https://x.com/intent/post?url=" },
		{ name: "telegram", url: "https://t.me/share/url?url=" },
		{ name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
		{ name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
	],
});
