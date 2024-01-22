
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../Button'
import discord from '/public/discord-logo-blue.png'

export const DiscordButton = () => {
    return (
        <Button
            variant='ghost'
            size='md'
            className='w-1/3 md:w-40 bg-white border-none rounded-xl'
        >
            <Link
                href='https://discord.gg/RjVfFSDSXz'
                target="_blank">
                <div className="object-cover">
                    <Image
                        src={discord}
                        className="object-cover"
                        alt="Discord"
                        priority
                    />
                </div>
            </Link>
        </Button>
    )
}
