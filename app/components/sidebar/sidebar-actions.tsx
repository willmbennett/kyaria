'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from '../ui/AlertDialog'
import { Button } from '../ui/button'
import { IconShare, IconSpinner, IconTrash } from '../ui/icons'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger
} from '../ui/tooltip'
import { SideBarItem } from '../../helper'
import { ActionItemType } from '../../board/job-helper'

interface SidebarActionsProps {
    item: SideBarItem
    removeItem: ActionItemType
}

export function SidebarActions({
    item,
    removeItem,
}: SidebarActionsProps) {
    const router = useRouter()
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false)
    //const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
    const [isRemovePending, startRemoveTransition] = React.useTransition()
    const itemCategory = item.category

    return (
        <>
            <div className="items-center">
                {/*}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="size-7 p-0 hover:bg-background"
                            onClick={() => setShareDialogOpen(true)}
                        >
                            <IconShare />
                            <span className="sr-only">Share</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Share chat</TooltipContent>
                </Tooltip>
    */}
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            className="size-7 p-0 hover:bg-background"
                            disabled={isRemovePending}
                            onClick={() => setDeleteDialogOpen(true)}
                        >
                            <IconTrash />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-white'>Delete {itemCategory}</TooltipContent>
                </Tooltip>
            </div>
            {/*
            <ChatShareDialog
                chat={chat}
                shareChat={shareChat}
                open={shareDialogOpen}
                onOpenChange={setShareDialogOpen}
                onCopy={() => setShareDialogOpen(false)}
            />
    */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`This will permanently delete your ${itemCategory}.`}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isRemovePending}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            disabled={isRemovePending}
                            onClick={event => {
                                event.preventDefault()
                                // @ts-ignore
                                startRemoveTransition(async () => {
                                    let url;
                                    let error;
                                
                                    if ('itemUrl' in item && item.itemUrl !== undefined) {
                                        ({ url, error } = await removeItem(item.id, item.href, item.itemUrl));
                                    } else {
                                        ({ url, error } = await removeItem(item.id, item.href));
                                    }
                                    setDeleteDialogOpen(false)

                                    //console.log('Made it to Deleation with: ', { url, error })

                                    if (error) {
                                        throw new Error(error)
                                    }
                                    if (url) {
                                        router.refresh()
                                        router.push(url)
                                    }
                                })
                            }}
                        >
                            {isRemovePending && <IconSpinner className="mr-2 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}