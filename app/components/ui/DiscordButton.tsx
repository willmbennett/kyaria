
import Image from 'next/image'
import { Button } from '../Button'
import discord from '/public/discord-logo-blue.png'

export const DiscordButton = () => {
    return (
        <Button
            href='https://discord.gg/RjVfFSDSXz'
            variant='ghost'
            size='md'
            className='w-1/3 md:w-40 bg-white border-none rounded-xl'
        >
            <div className="object-cover">
                <Image
                    src={discord}
                    className="object-cover"
                    alt="Discord"
                />
            </div>
        </Button>
    )
}
