import React, { useState, useEffect, useMemo } from 'react';

export interface MarkdownHeading {
	depth: number;
	slug: string;
	text: string;
}

export interface HeadingTreeNode {
	heading: MarkdownHeading;
	children: HeadingTreeNode[];
}

export function buildHeadingTree(headings: MarkdownHeading[]): HeadingTreeNode[] {
	const root: HeadingTreeNode[] = [];
	const stack: { node: HeadingTreeNode; depth: number }[] = [];

	for (const heading of headings) {
		const node: HeadingTreeNode = {
			heading,
			children: [],
		};

		while (stack.length > 0 && stack[stack.length - 1].depth >= heading.depth) {
			stack.pop();
		}

		if (stack.length === 0) {
			root.push(node);
		} else {
			stack[stack.length - 1].node.children.push(node);
		}

		stack.push({ node, depth: heading.depth });
	}

	return root;
}

interface MarkdownTreeProps {
	headings: MarkdownHeading[];
	lang?: 'es' | 'en';
}

interface TreeNodeItemProps {
	node: HeadingTreeNode;
	activeSlug: string;
	collapsedMap: Record<string, boolean>;
	onToggleCollapse: (slug: string) => void;
	onHeadingClick: (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => void;
	level: number;
}

function TreeNodeItem({
	node,
	activeSlug,
	collapsedMap,
	onToggleCollapse,
	onHeadingClick,
	level,
}: TreeNodeItemProps) {
	const hasChildren = node.children.length > 0;
	const isCollapsed = Boolean(collapsedMap[node.heading.slug]);
	const isActive = activeSlug === node.heading.slug;

	return (
		<li
			className={`tree-node relative ${
				level > 1
					? "before:content-[''] before:absolute before:-left-[10px] before:top-[14px] before:w-[7px] before:h-[1px] before:bg-[rgba(var(--text-muted),0.3)]"
					: ''
			}`}
		>
			<div
				className={`tree-node-content flex items-center gap-1.5 py-1 px-1.5 rounded transition-all group${
					isActive
						? 'bg-[rgba(var(--text-muted),0.5)] font-semibold text-[var(--accent)] border-2 border-red'
						: 'hover:bg-[rgba(var(--text-muted),0.5)] text-[rgb(var(--text-secondary))]'
				}`}
			>
				{hasChildren ? (
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							onToggleCollapse(node.heading.slug);
						}}
						className="tree-chevron p-0.5 rounded hover:bg-[rgba(var(--text-muted),0.2)] text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text-primary))] transition-transform cursor-pointer"
						aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
						title={isCollapsed ? 'Expand' : 'Collapse'}
					>
						<svg
							className={`w-3.5 h-3.5 transition-transform duration-200 ${
								isCollapsed ? '-rotate-90 text-[rgb(var(--text-muted))]' : 'rotate-0 text-[var(--accent)]'
							}`}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth="2.5"
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
						</svg>
					</button>
				) : (
					<span className="w-3.5 h-3.5 flex items-center justify-center text-[rgb(var(--text-muted))] opacity-40 text-xs">
						•
					</span>
				)}

				<a
					href={`#${node.heading.slug}`}
					onClick={(e) => onHeadingClick(e, node.heading.slug)}
					className={`tree-link flex-1 text-sm truncate no-underline transition-colors ${
						isActive
							? 'text-[var(--accent)] font-semibold'
							: 'text-[rgb(var(--text-secondary))] hover:text-[var(--accent)]'
					}`}
					title={node.heading.text}
				>
					{node.heading.text}
				</a>
			</div>

			{hasChildren && !isCollapsed && (
				<ul className="tree-children ml-3 pl-2.5 border-l-2 border-[rgba(var(--text-muted),0.25)] space-y-0.5 mt-0.5">
					{node.children.map((child) => (
						<TreeNodeItem
							key={child.heading.slug}
							node={child}
							activeSlug={activeSlug}
							collapsedMap={collapsedMap}
							onToggleCollapse={onToggleCollapse}
							onHeadingClick={onHeadingClick}
							level={level + 1}
						/>
					))}
				</ul>
			)}
		</li>
	);
}

export default function MarkdownTree({ headings = [], lang = 'es' }: MarkdownTreeProps) {
	const [activeSlug, setActiveSlug] = useState<string>('');
	const [collapsedMap, setCollapsedMap] = useState<Record<string, boolean>>({});
	const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

	const tree = useMemo(() => buildHeadingTree(headings), [headings]);

	// Auto-expand any collapsed parents when active heading changes
	useEffect(() => {
		if (!activeSlug) return;

		setCollapsedMap((prev) => {
			const next = { ...prev };
			let changed = false;

			const expandParents = (nodes: HeadingTreeNode[], path: string[] = []): boolean => {
				for (const node of nodes) {
					if (node.heading.slug === activeSlug) {
						path.forEach((parentSlug) => {
							if (next[parentSlug]) {
								next[parentSlug] = false;
								changed = true;
							}
						});
						return true;
					}
					if (node.children.length > 0) {
						if (expandParents(node.children, [...path, node.heading.slug])) {
							return true;
						}
					}
				}
				return false;
			};

			expandParents(tree);
			return changed ? next : prev;
		});
	}, [activeSlug, tree]);

	// Scrollspy: detect currently visible heading
	useEffect(() => {
		if (headings.length === 0) return;

		const updateActiveHeading = () => {
			const headingElements = headings
				.map((h) => document.getElementById(h.slug))
				.filter((el): el is HTMLElement => el !== null);

			if (headingElements.length === 0) return;

			let currentActive = headingElements[0].id;
			for (const el of headingElements) {
				const top = el.getBoundingClientRect().top;
				if (top <= 140) {
					currentActive = el.id;
				} else {
					break;
				}
			}

			setActiveSlug(currentActive);
		};

		window.addEventListener('scroll', updateActiveHeading, { passive: true });
		updateActiveHeading();

		return () => {
			window.removeEventListener('scroll', updateActiveHeading);
		};
	}, [headings]);

	const handleToggleCollapse = (slug: string) => {
		setCollapsedMap((prev) => ({
			...prev,
			[slug]: !prev[slug],
		}));
	};

	const handleToggleAll = () => {
		const allSlugsWithChildren: string[] = [];
		const collectSlugs = (nodes: HeadingTreeNode[]) => {
			for (const node of nodes) {
				if (node.children.length > 0) {
					allSlugsWithChildren.push(node.heading.slug);
					collectSlugs(node.children);
				}
			}
		};
		collectSlugs(tree);

		const areAnyCollapsed = allSlugsWithChildren.some((slug) => collapsedMap[slug]);
		if (areAnyCollapsed) {
			// Expand all
			setCollapsedMap({});
		} else {
			// Collapse all
			const newMap: Record<string, boolean> = {};
			for (const slug of allSlugsWithChildren) {
				newMap[slug] = true;
			}
			setCollapsedMap(newMap);
		}
	};

	const handleHeadingClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
		e.preventDefault();
		const target = document.getElementById(slug);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			history.replaceState(null, '', `#${slug}`);
			setActiveSlug(slug);
			setIsMobileOpen(false);
		}
	};

	if (headings.length === 0) {
		return null;
	}

	const title = lang === 'en' ? 'On this page' : 'Estructura de la nota';
	const toggleAllTitle = lang === 'en' ? 'Toggle all' : 'Colapsar/Expandir';

	return (
		<aside className="markdown-tree-wrapper">
			{/* Mobile collapsible toggle */}
			<div className="lg:hidden mb-4">
				<button
					type="button"
					onClick={() => setIsMobileOpen((prev) => !prev)}
					className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg border border-[rgba(var(--text-muted),0.3)] bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] font-medium text-sm transition-colors"
				>
					<span className="flex items-center gap-2">
						<svg
							className="w-4 h-4 text-[var(--accent)]"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<line x1="8" y1="6" x2="21" y2="6"></line>
							<line x1="8" y1="12" x2="21" y2="12"></line>
							<line x1="8" y1="18" x2="21" y2="18"></line>
							<line x1="3" y1="6" x2="3.01" y2="6"></line>
							<line x1="3" y1="12" x2="3.01" y2="12"></line>
							<line x1="3" y1="18" x2="3.01" y2="18"></line>
						</svg>
						{title}
					</span>
					<svg
						className={`w-4 h-4 transition-transform duration-200 ${
							isMobileOpen ? 'rotate-180' : 'rotate-0'
						}`}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
					</svg>
				</button>

				{isMobileOpen && (
					<nav className="mt-2 p-3 rounded-lg border border-[rgba(var(--text-muted),0.25)] bg-[rgb(var(--bg-secondary))] max-h-80 overflow-y-auto">
						<ul className="space-y-1">
							{tree.map((node) => (
								<TreeNodeItem
									key={node.heading.slug}
									node={node}
									activeSlug={activeSlug}
									collapsedMap={collapsedMap}
									onToggleCollapse={handleToggleCollapse}
									onHeadingClick={handleHeadingClick}
									level={1}
								/>
							))}
						</ul>
					</nav>
				)}
			</div>

			{/* Desktop sticky sidebar */}
			<nav
				className="markdown-tree-desktop hidden lg:block sticky top-8 w-64 xl:w-72 max-h-[calc(100vh-5rem)] overflow-y-auto p-4 rounded-xl border border-[rgba(var(--text-muted),0.2)] bg-[rgb(var(--bg-secondary))]/60 backdrop-blur-sm"
				aria-label={title}
			>
				<div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(var(--text-muted),0.2)]">
					<button
						type="button"
						onClick={handleToggleAll}
						className="text-[11px] font-medium text-[rgb(var(--text-muted))] hover:text-[var(--accent)] transition-colors cursor-pointer px-1.5 py-0.5 rounded hover:bg-[rgba(var(--text-muted),0.1)]"
						title={toggleAllTitle}
					>
						{toggleAllTitle}
					</button>
				</div>

				<ul className="space-y-0.5 text-sm list-none p-0 m-0">
					{tree.map((node) => (
						<TreeNodeItem
							key={node.heading.slug}
							node={node}
							activeSlug={activeSlug}
							collapsedMap={collapsedMap}
							onToggleCollapse={handleToggleCollapse}
							onHeadingClick={handleHeadingClick}
							level={1}
						/>
					))}
				</ul>
			</nav>
		</aside>
	);
}
