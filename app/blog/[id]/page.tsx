import type { Metadata, ResolvingMetadata } from 'next'
import { Suspense } from 'react'
import { getPost } from '../../../lib/post-db'
import { PostClass } from '../../../models/Post';
import Post from '../../components/blog/Post';
import Await from '../../jobs/await';
import Skeleton from './skeleton';

type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id

    // fetch data
    const { post } = await getPost(id) as { post: PostClass };

    const images = post.images ? post.images : []

    return {
        title: post.title,
        openGraph: {
            images,
        },
    }
}

export default async function Posts({ params }: { params: { id: string } }) {
    // read route params
    const id = params.id
    const postPromise = getPost(id);

    return (
        <>
            <Suspense fallback={<Skeleton />}>
                {/* @ts-expect-error Server Component */}
                <Await promise={postPromise}>
                    {({ post }: { post: PostClass }) => (
                        <Post post={post} />
                    )}
                </Await>
            </Suspense>
        </>
    );
}

