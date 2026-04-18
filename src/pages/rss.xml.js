import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('journal', ({ data }) => !data.draft);
  
  return rss({
    title: "Brahma | Zero State Protocol",
    description: "Security research journal by Brahma",
    site: context.site || 'https://brahma.dev',
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `${import.meta.env.BASE_URL}/journal/${post.id}/`,
    })),
  });
}
