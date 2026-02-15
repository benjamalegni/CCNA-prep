"use client";

import { useEffect } from 'react';
import { navigate } from 'astro:transitions/client';
import { useStore } from '../../utils/store';

type ButtonsProps = {
	pages: string[];
	currentSlug: string | null;
};

export default function Buttons({ pages, currentSlug }: ButtonsProps) {
	useEffect(() => {
		useStore.getState().init(pages, currentSlug);
	}, [pages, currentSlug]);

	const handlePrev = () => {
		const store = useStore.getState();
		const prevSlug = store.prevSlug();
		if (!prevSlug) {
			return;
		}

		store.setCurrentBySlug(prevSlug);
		navigate(`/ccna?page=${encodeURIComponent(prevSlug)}`);
	};

	const handleNext = () => {
		const store = useStore.getState();
		const nextSlug = store.nextSlug();
		if (!nextSlug) {
			return;
		}

		store.setCurrentBySlug(nextSlug);
		navigate(`/ccna?page=${encodeURIComponent(nextSlug)}`);
	};

	return (
		<>
			<button type="button" onClick={handlePrev} style={{cursor: 'pointer'}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-arrow-left"
				>
					<path d="M19 12H5" />
					<path d="M12 19L5 12L12 5" />
				</svg>
			</button>

			<button type="button" onClick={handleNext} style={{cursor: 'pointer'}}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="lucide lucide-arrow-right"
				>
					<path d="M5 12h14" />
					<path d="M12 5l7 7-7 7" />
				</svg>
			</button>
		</>
	);
}