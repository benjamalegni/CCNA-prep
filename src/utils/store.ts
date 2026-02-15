import { createStore } from 'zustand/vanilla';

type NavigationState = {
	pages: string[];
	currentIndex: number;
	init: (pages: string[], currentSlug: string | null) => void;
	setCurrentBySlug: (slug: string | null) => void;
	nextSlug: () => string | null;
	prevSlug: () => string | null;
};

export const useStore = createStore<NavigationState>((set, get) => ({
	pages: [],
	currentIndex: -1,

	init: (pages, currentSlug) => {
		const sortedPages = [...pages].sort((a, b) =>
			a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
		);
		const index = currentSlug ? sortedPages.indexOf(currentSlug) : -1;

		set({
			pages: sortedPages,
			currentIndex: index,
		});
	},

	setCurrentBySlug: (slug) => {
		if (!slug) {
			set({ currentIndex: -1 });
			return;
		}

		const pages = get().pages;
		set({ currentIndex: pages.indexOf(slug) });
	},

	nextSlug: () => {
		const { pages, currentIndex } = get();
		if (currentIndex < 0 || currentIndex >= pages.length - 1) {
			return null;
		}

		return pages[currentIndex + 1];
	},

	prevSlug: () => {
		const { pages, currentIndex } = get();
		if (currentIndex <= 0) {
			return null;
		}

		return pages[currentIndex - 1];
	},
}));