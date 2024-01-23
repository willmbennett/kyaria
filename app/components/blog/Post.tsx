import { parseISO, format } from 'date-fns';
import { PostClass } from "../../../models/Post";
import Image from 'next/image'
import { PostContent } from './PostContent';
import { Button } from '../Button';


export default function Post({ post }: { post: PostClass }) {
    let { title, featuredImage, author, content, tags, createdAt } = post;
    const date = createdAt instanceof Date ? createdAt : parseISO(createdAt);

    return (
        <div className='w-full flex flex-col'>
            <div className='flex items-center justify-start mb-3'>
                <Button size='sm' variant='ghost' href="/blog">← Back to Blog</Button>
            </div>
            <div itemScope className="text-left border rounded-none bg-white shadow-sm hover:shadow-md transition-shadow duration-300">

                <div className="p-4 md:p-6">
                    <h1 itemProp="headline" className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 mb-8">{title}</h1>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        {author && <h6 itemProp="author" className="text-lg font-medium text-neutral-700" itemType="https://schema.org/Person">By
                        <span itemProp="name">Jane Doe</span></h6>}
                        <time itemProp="datePublished" className="text-sm text-neutral-500" dateTime={createdAt.toLocaleString()}>
                            {format(date, 'LLLL d, yyyy')}
                        </time>
                    </div>
                    {tags && <p className="text-neutral-600 mb-4">{tags.join(', ')}</p>}
                    {featuredImage && (
                        <Image
                            itemProp="image"
                            src={featuredImage}
                            alt="Picture of the author"
                            width={500}
                            height={500}
                            className="w-full"
                        // Additional properties like width, height, blurDataURL, placeholder can be added here
                        />
                    )}
                    <div className="border-b-2 border-neutral-100 mb-4"></div>
                    {content && <PostContent content={content} />}
                </div>
            </div>
        </div>
    );
}
