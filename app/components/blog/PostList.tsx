import { PostClass } from "../../../models/Post";
import PostCard from "./PostCard";

export default function PostList({ posts }: { posts: PostClass[] }) {

    // Group posts by the first tag
    const groupedPosts = posts.reduce((acc, post) => {
        const topic = post.tags ? post.tags[0] : 'Uncategorized'; // Default to 'Uncategorized' if no tags
        if (!acc[topic]) {
            acc[topic] = [];
        }
        acc[topic].push(post);
        return acc;
    }, {} as Record<string, PostClass[]>);

    return (
        <div>
            {Object.entries(groupedPosts).map(([topic, posts]) => (
                <div key={topic}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">Topic: {topic}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {posts.map((post: PostClass) => (
                            <div key={post._id.toString()} className="w-full">
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
