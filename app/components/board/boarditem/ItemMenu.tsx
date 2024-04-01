import { useState, useTransition } from 'react';
import { Button } from '../../ui/button';
import { IconSpinner, IconTrash } from '../../ui/icons';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../../ui/AlertDialog';

export const ItemMenu = ({ onDelete }: { onDelete: () => Promise<void> }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    //const [shareDialogOpen, setShareDialogOpen] = React.useState(false)
    const [isRemovePending, startRemoveTransition] = useTransition()

    return (
        <>
            <Button
                variant="ghost"
                className="size-7 p-0 hover:bg-background"
                disabled={isRemovePending}
                onClick={() => setDeleteDialogOpen(true)}
            >
                <IconTrash />
                <span className="sr-only">Delete</span>
            </Button>
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent className='bg-white dark:bg-slate-800 dark:text-white'>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            {`This will permanently delete your Job Application.`}
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
                                    await onDelete()
                                    setDeleteDialogOpen(false)
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
    );
};
