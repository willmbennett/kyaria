import { MetadataRoute } from 'next'
import { getPosts } from '../lib/post-db'


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseURLs: MetadataRoute.Sitemap = [
        {
            url: 'https://www.kyaria.ai/',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: 'https://www.kyaria.ai/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: 'https://www.kyaria.ai/pricing',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        {
            url: 'https://www.kyaria.ai/jobs',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
        },
        {
            url: 'https://www.kyaria.ai/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    const { posts } = await getPosts()

    if (posts) {
        const postUrls: MetadataRoute.Sitemap =
            posts.map((post) => ({
                url: `https://www.kyaria.ai/blog/${post._id}`,
                lastModified: new Date(post.updatedAt.toLocaleString()),
                changeFrequency: 'yearly',
                priority: 0.8
            })
            );

        return [...baseURLs, ...postUrls];
    }

    return baseURLs;
}