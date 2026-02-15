import type { Plugin } from 'unified';
import type { Root, Heading, Link, Image, Strong, Emphasis, Html } from 'mdast';
import { visit } from 'unist-util-visit';
import { findAndReplace } from 'mdast-util-find-and-replace';
import { IMAGE_EXT_REGEX, ABSOLUTE_URL_REGEX, CCNA_MEDIA_BASE_URL, CCNA_MEDIA_BASE_PREFIX_REGEX, OBSIDIAN_ITALIC_FOUR_STAR_REGEX, OBSIDIAN_BOLD_REGEX, OBSIDIAN_HIGHLIGHT_REGEX } from '../consts';


const escapeHtml = (value: string): string =>
	value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export const remarkObsidianLinks: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, 'heading', (node: Heading) => {
			if (node.depth === 1) {
				node.depth = 2;
			}
		});

		const obsidianLinkRegex = /(!)?\[\[([^\]]+)\]\]/g;

		findAndReplace(tree, [
			[
				obsidianLinkRegex,
				(_match, _embedMarker: string | undefined, inner: string) => {
					const [linkTargetRaw, linkText] = inner.split('|');
					const linkTarget = linkTargetRaw.trim();
					const displayText = (linkText || linkTarget).trim();

					const encodedTarget = encodeURIComponent(linkTarget);

					if (IMAGE_EXT_REGEX.test(linkTarget)) {
						const normalizedLocalTarget = linkTarget
							.replace(/\\/g, '/')
							.replace(/^\.\//, '')
							.replace(/^\/+/, '');
						const mediaRelativeTarget = normalizedLocalTarget.replace(/^media\//i, '');
						const imageUrl = ABSOLUTE_URL_REGEX.test(linkTarget)
							? linkTarget
							: `${CCNA_MEDIA_BASE_URL}/${encodeURI(mediaRelativeTarget)}`;

						const imageNode: Image = {
							type: 'image',
							url: imageUrl,
							alt: displayText || undefined,
						};
						return imageNode;
					}

					const linkNode: Link = {
						type: 'link',
						url: `/ccna?page=${encodedTarget}`,
						children: [{ type: 'text', value: displayText }],
					};

					return linkNode;
				},
			],
		]);

		findAndReplace(tree, [
			[
				OBSIDIAN_ITALIC_FOUR_STAR_REGEX,
				(_match, inner: string) => {
					const italicNode: Emphasis = {
						type: 'emphasis',
						children: [{ type: 'text', value: inner.trim() }],
					};
					return italicNode;
				},
			],
			[
				OBSIDIAN_BOLD_REGEX,
				(_match, inner: string) => {
					const strongNode: Strong = {
						type: 'strong',
						children: [{ type: 'text', value: inner.trim() }],
					};
					return strongNode;
				},
			],
			[
				OBSIDIAN_HIGHLIGHT_REGEX,
				(_match, inner: string) => {
					const safeContent = escapeHtml(inner.trim());
					const markNode: Html = {
						type: 'html',
						value: `<mark>${safeContent}</mark>`,
					};
					return markNode;
				},
			],
		]);

		visit(tree, 'image', (node: Image) => {
			const originalUrl = node.url?.trim();
			if (!originalUrl || ABSOLUTE_URL_REGEX.test(originalUrl)) {
				return;
			}

			if (!IMAGE_EXT_REGEX.test(originalUrl)) {
				return;
			}

			if (CCNA_MEDIA_BASE_PREFIX_REGEX.test(originalUrl)) {
				node.url = originalUrl.startsWith('/') ? originalUrl : `/${originalUrl}`;
				return;
			}

			const normalizedLocalTarget = originalUrl
				.replace(/\\/g, '/')
				.replace(/^\.\//, '')
				.replace(/^\/+/, '');
			const mediaRelativeTarget = normalizedLocalTarget.replace(/^media\//i, '');
			node.url = `${CCNA_MEDIA_BASE_URL}/${encodeURI(mediaRelativeTarget)}`;
		});
	};
};
