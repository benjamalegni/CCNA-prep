import type { Plugin } from 'unified';
import type { Root, Heading, Link } from 'mdast';
import { visit } from 'unist-util-visit';
import { findAndReplace } from 'mdast-util-find-and-replace';

export const remarkObsidianLinks: Plugin<[], Root> = () => {
	return (tree) => {
		visit(tree, 'heading', (node: Heading) => {
			if (node.depth === 1) {
				node.depth = 2;
			}
		});

		const obsidianLinkRegex = /\[\[([^\]]+)\]\]/g;

		findAndReplace(tree, [
			[
				obsidianLinkRegex,
				(_match, inner: string) => {
					const [linkTargetRaw, linkText] = inner.split('|');
					const linkTarget = linkTargetRaw.trim();
					const displayText = (linkText || linkTarget).trim();

					const encodedTarget = encodeURIComponent(linkTarget);

					const linkNode: Link = {
						type: 'link',
						url: `/ccna?page=${encodedTarget}`,
						children: [{ type: 'text', value: displayText }],
					};

					return linkNode;
				},
			],
		]);
	};
};
