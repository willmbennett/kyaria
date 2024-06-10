
import Image from 'next/image'
import Link from 'next/link'
import discord from '/public/discord-logo-blue.png'

export const DiscordButton = () => {
    return (
        <div className='w-full flex flex-col text-center gap-2'>
            <p className='text-sm text-slate-500'>Join our</p>
            <Link
                href='https://discord.gg/RjVfFSDSXz'
                target="_blank">
                <div className="object-cover hover:bg-slate-700 hover:text-white w-full px-4 py-2 flex justify-center">
                    <Image
                        src={discord}
                        className="object-cover"
                        alt="Discord"
                        priority
                        width={100}
                    />
                </div>
            </Link>
        </div>
    )
}
