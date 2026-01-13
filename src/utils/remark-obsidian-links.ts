import type { Plugin } from 'unified';
import type { Root, Link } from 'mdast';
import { findAndReplace } from 'mdast-util-find-and-replace';
import type { CollectionEntry } from 'astro:content';

// Plugin para convertir links de Obsidian [[archivo]] a links de Markdown
export function remarkObsidianLinks(ccnaNotes: CollectionEntry<'ccna'>[]): Plugin<[], Root> {
	return (tree) => {
		// Crear un mapa: nombre del archivo -> slug/id
		const noteMap = new Map<string, string>();
		ccnaNotes.forEach((note) => {
			// Extraer el nombre del archivo sin extensión
			const filename = note.id.split('/').pop()?.replace(/\.md$/, '') || '';
			noteMap.set(filename.toLowerCase(), note.id);
			// También guardar con el nombre exacto
			noteMap.set(filename, note.id);
		});

		// Patrón para encontrar links de Obsidian [[archivo]] o [[archivo|texto]]
		const obsidianLinkRegex = /\[\[([^\]]+)\]\]/g;

		findAndReplace(tree, [
			[
				obsidianLinkRegex,
				(match) => {
					const linkContent = match[1]; // Contenido dentro de [[ ]]
					// Procesar el link: puede ser "archivo" o "archivo|texto visible"
					const [linkTarget, linkText] = linkContent.split('|');
					const displayText = linkText || linkTarget;

					// Buscar la nota correspondiente
					const noteId = noteMap.get(linkTarget) || noteMap.get(linkTarget.toLowerCase());
					const href = noteId 
						? `/notas/CCNA/${noteId.replace(/\.md$/, '')}` 
						: '#'; // Si no se encuentra, usar # como fallback

					// Crear nodo de link
					const linkNode: Link = {
						type: 'link',
						url: href,
						children: [{ type: 'text', value: displayText }],
					};

					return linkNode;
				},
			],
		]);
	};
}
