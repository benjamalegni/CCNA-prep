import type { Plugin } from 'unified';
import type { Root, Heading, Link, Image } from 'mdast';
import { visit } from 'unist-util-visit';
import { findAndReplace } from 'mdast-util-find-and-replace';

const IMAGE_EXT_REGEX = /\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i;
const ABSOLUTE_URL_REGEX = /^(?:[a-z]+:)?\/\//i;
const CCNA_MEDIA_BASE_URL = '/src/content/notas/CCNA/media';
const CCNA_MEDIA_BASE_PREFIX_REGEX = /^\/?src\/content\/notas\/CCNA\/media\//i;

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
