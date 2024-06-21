import type { Metadata, ResolvingMetadata } from 'next'
import { getPost } from '../../../lib/post-db'
import { PostClass } from '../../../models/Post';
import Post from '../../components/blog/Post';


export async function generateMetadata(
    { params }: { params: { id: string } },
    parent: ResolvingMetadata
): Promise<Metadata> {
    // Read route params
    const id = params.id;

    // Fetch data
    const { post } = await getPost(id) as { post: PostClass };

    // Prepare images for Open Graph
    const images = post.featuredImage ? [{ url: post.featuredImage }] : [];

    // Extract a summary for the description (e.g., first 100 characters)
    const description = post.content ? post.content.substring(0, 100) : '';

    return {
        title: post.title,
        description,
        openGraph: {
            images,
            title: post.title,
            url: `https://www.kyaria.ai/blog/${id}`,
            type: 'article', // You can set more specific type based on your content
            // Additional Open Graph properties can be set here
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description,
            images
        },
        // Additional metadata like Twitter card data can also be included
    };
}


export default async function Posts({ params }: { params: { id: string } }) {
    // read route params
    const id = params.id
    const { post } = await getPost(id) as { post: PostClass }

    return (
        <Post post={post} />
    );
}

