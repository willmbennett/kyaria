import { getPosts } from '../../lib/post-db';
import PostList from '../components/blog/PostList';
import { checkSubscription } from '../../lib/hooks/check-subscription';
import { Button } from '../components/Button';

const userIdList = [
    "650f813286f63a9d8c0080ee",
    "6510aadf255eb1d64f9cc272",
    "651146ab26d83e7a6daac978",
    "6513c2cd8063290ee8e8515e",
    "65145be92f9b5cae6bf71f09",
    "6517481adbbff5b2580b0783"
]

export default async function Posts() {
    const { posts } = await getPosts();
    const { userId } = await checkSubscription()

    return (
        <>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Kyaria.ai Insights: Your AI Guide for Career Moves</h2>
            <p className="mb-4 text-base md:text-lg">Hey there! Welcome to the Kyaria.ai Blog. This is where AI meets career smarts. We're here in San Francisco, mixing tech know-how with solid career tips to help you move up in your career.</p>
            <p className="mb-4 text-base md:text-lg">We started back in August 2023 and haven't stopped pushing boundaries. Our tools? Things like a resume builder that's smarter than those pesky tracking systems and a job board that makes your search a visual breeze. Our blog? It's all about giving you the newest tips, trends, and hands-on advice to grow your career. From nailing practice interviews to writing networking emails that get responses, we've got you covered. Plus, you'll get sneak peeks at our latest features and beta tests. Come along for the ride as we dive into the cool world of AI and career progress!</p>
            {userIdList.includes(userId) && <Button href='/blog/new'>New Post</Button>}
            <ul>
                <>{posts && posts.length > 0 && <PostList posts={posts} />}</>
            </ul>
        </>
    );
}
