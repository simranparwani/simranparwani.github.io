import { items } from "./data.js"


export function load() {
	return {
		images: items.map((item) => ({
			src: item.embed_link,
			title: item.title,
            href: item.href,
            category: item.category,
			featured: item.featured

		}))
	};
}
