'use client'

import { PostClass } from "../../../models/Post";
import { useForm, FormProvider } from "react-hook-form";
import ListInput from "./ListInput";
import { NewPostFormData } from "../../blog/blog-helper";
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from "../Button";
import { useRouter } from 'next/navigation';
import { createPostAction } from "../../blog/_action";
import { CldUploadWidget } from 'next-cloudinary';
import { useState } from "react";
import Image from "next/image";
import { PostContent } from "./PostContent";
import { sampleData } from "../../blog/blog-helper";

export default function NewPostForm({ userId, userName }: { userId: string, userName: string }) {
    const defaultValues = {
        title: sampleData.title,
        content: sampleData.content,
        author: sampleData.author,
        tags: sampleData.tags.map(tag => ({ label: tag, value: tag })),
        featuredImage: sampleData.featuredImage,
        images: sampleData.images
    };

    const methods = useForm<NewPostFormData>({ defaultValues: defaultValues });
    const [imageUrls, setImageUrls] = useState<string[]>(sampleData.images);
    const [featuredImage, setFeaturedImage] = useState<string>('');
    const [mode, setMode] = useState('edit'); // 'edit' or 'preview'

    const { register, handleSubmit, control, watch, formState: { errors } } = methods

    const router = useRouter()

    const toggleMode = () => {
        setMode(mode === 'edit' ? 'preview' : 'edit');
    };

    const handleSuccess = (result: any) => {
        console.log('Upload result received:', result);

        if (result?.info) {
            const item = result?.info
            if (item.secure_url) {
                console.log(`Image uploaded: ${item.secure_url}`);
                setImageUrls(prevUrls => [...prevUrls, item.secure_url]);
            } else {
                console.warn('An item without a secure_url was encountered');
            }
        } else {
            console.warn('No items found in the upload result to process');
        }
    };

    const handleImageClick = (imageUrl: string) => {
        setFeaturedImage(imageUrl);
    };

    const savetoDatabase = async (data: Partial<PostClass>) => {
        console.log('Data to save', data); // Log the data being saved

        try {
            const { postId, error } = await createPostAction(data, '/');
            console.log('Created Post: ', postId); // Log the result after successful creation

            if (error) {
                console.error('Error returned from createPostAction:', error); // Log if there's an error returned
            }

            router.push('/blog');
        } catch (error) {
            console.error('Error saving to database:', error); // Log any exception thrown during save
            // Handle the error appropriately
        }
    };

    const onSubmit = (data: NewPostFormData) => {
        console.log('Form submission data:', data); // Log the raw form data

        // Convert tags to your desired format, if necessary
        const tags = data.tags?.map(tag => tag.value);

        // Construct the final data object to be saved
        const postData = {
            ...data,
            userId: userId,
            featureImage: featuredImage,
            images: imageUrls,
            tags: tags
        };

        console.log('Post data after processing:', postData); // Log the post data after processing
        savetoDatabase(postData); // Send the data to the server/API
    };


    return (
        <div className="w-full lg:max-w-5xl bg-white">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-6 p-4 border border-slate-400 shadow rounded-md'>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">New Post</h2>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title
                        </label>
                        <TextareaAutosize
                            {...register('title')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Title"
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Author
                        </label>
                        <TextareaAutosize
                            {...register('author')}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder={userName}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Images (.png, .jpg, .jpeg only)
                        </label>
                        <CldUploadWidget
                            uploadPreset="kyariablog"
                            onSuccess={handleSuccess}
                            options={{ multiple: true }}
                        >
                            {({ open }) => {
                                return (
                                    <Button size="sm" type='button' onClick={() => open()} className='mb-4'>
                                        Upload Images
                                    </Button>
                                );
                            }}
                        </CldUploadWidget>
                        {imageUrls &&
                            <div className="flex flex-col">
                                <p>Select Featured Image</p>
                                <div className="grid grid-cols-3 gap-4 my-4">
                                    {imageUrls.map((image, index) => {
                                        const [copySuccess, setCopySuccess] = useState('');
                                        const handleCopyClick = async (imageUrl: string, index: number) => {
                                            try {
                                                await navigator.clipboard.writeText(`![Image](${imageUrl})`);
                                                setCopySuccess(`Copied!`);
                                                setTimeout(() => setCopySuccess(''), 2000); // Reset the message after 2 seconds
                                            } catch (err) {
                                                console.error('Failed to copy:', err);
                                            }
                                        };
                                        return (
                                            <div className="flex flex-col space-y-1" key={index}>
                                                <div key={index} className={`cursor-pointer border-2 ${image === featuredImage ? 'border-blue-500' : 'border-transparent'}`}
                                                    onClick={() => handleImageClick(image)}
                                                >
                                                    <Image src={image} width={500} height={300} className="w-full" alt={`Image ${index}`} />

                                                </div>
                                                <Button size="sm" variant="secondary" type="button" onClick={() => handleCopyClick(image, index)} className="btn">
                                                    Copy Markdown
                                                </Button>
                                                {copySuccess && <p>{copySuccess}</p>}
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        }
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tags
                        </label>
                        <ListInput
                            name="tags"
                            control={control}
                        />
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Content
                        </label>
                        <div className="flex border border-gray-300 rounded w-full mb-2 cursor-pointer">
                            <div
                                onClick={() => setMode('edit')}
                                className={`flex-1 text-center py-2 rounded-l ${mode === 'edit' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Edit
                            </div>
                            <div
                                onClick={() => setMode('preview')}
                                className={`flex-1 text-center py-2 rounded-r ${mode === 'preview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                Preview
                            </div>
                        </div>
                        {mode === 'edit' ? (
                            <TextareaAutosize
                                {...register('content')}
                                minRows={50}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter Markdown content here"
                            />
                        ) : (
                            <PostContent content={watch('content')} />
                        )}
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}