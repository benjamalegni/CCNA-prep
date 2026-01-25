import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const ccna = defineCollection({
	// Load Markdown files in the `src/content/notas/CCNA/notes/` directory.
	loader: glob({ base: './src/content/notas/CCNA/notes', pattern: '**/*.md' }),
	// Schema simple para las notas CCNA
	schema: z.object({
		title: z.string().optional(),
	}),
});

export const collections = { ccna };