import Link from "next/link";
import { parseISO, format } from 'date-fns';
import { Button } from "../Button";
import { PostClass } from "../../../models/Post";
import Image from 'next/image'

export default function BlogPostCard({ post }: { post: PostClass }) {
    let { _id, title, featuredImage, author, content, tags, createdAt } = post;
    const date = createdAt instanceof Date ? createdAt : parseISO(createdAt);

    return (
        <Link href={`/blog/${_id}`}>
            <div className="text-left my-3 mx-2 border rounded-none bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
                {featuredImage && (
                    <div
                        className="relative h-64  w-full overflow-hidden bg-cover"
                        style={{ backgroundImage: `url(${featuredImage})` }}
                    ></div>
                )}
                <div className="p-4 md:p-6">

                    <h5 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-2 md:mb-0">
                        {title}
                    </h5>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        {author && <h6 className="text-lg font-medium text-neutral-700">{author}</h6>}
                        <time className="text-sm text-neutral-500" dateTime={createdAt.toLocaleString()}>
                            {format(date, 'LLLL d, yyyy')}
                        </time>
                    </div>
                    {tags && <p className="text-neutral-600 mb-4">{tags.join(', ')}</p>}
                </div>
            </div>
        </Link>
    );
}
