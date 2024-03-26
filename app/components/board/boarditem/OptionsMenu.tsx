import { TooltipTrigger, TooltipContent, Tooltip } from '@radix-ui/react-tooltip';
import { Button } from '../../Button';
import { MouseEventHandler } from 'react';
import { boardItemType } from '../../../board/job-helper';

interface OptionsMenuProps {
    isActive: boolean;
    showDetails: boolean;
    hasDetails: boolean;
    toggleDetails: () => void
    handleViewPacketClick: () => void
    handleClose: MouseEventHandler<HTMLButtonElement>

}

export const OptionsMenu = ({
    isActive,
    hasDetails,
    showDetails,
    toggleDetails,
    handleViewPacketClick,
    handleClose
}: OptionsMenuProps) => {

    return (
        <div className="flex w-full gap-2 items-center">
            {/* Toggle Details Button */}
            {hasDetails && (
                <button
                    type="button"
                    onClick={toggleDetails}
                    aria-label={showDetails ? 'Hide Details' : 'Show Details'}
                    className="text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 rounded-md px-3 py-2 transition ease-in-out duration-150"
                >
                    {showDetails ? 'Hide Details' : 'Show Details'}
                </button>
            )}
            {/* View Packet Button */}
            <button
                type="button"
                onClick={handleViewPacketClick}
                aria-label="View Packet"
                className="text-sm px-3 py-2 rounded-md text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50 transition ease-in-out duration-150"
            >
                View Packet
            </button>

            {/* Close or Active/Inactive Button with Tooltip */}
            <Tooltip delayDuration={400}>
                <TooltipTrigger asChild>
                    <button
                        type="button"
                        onClick={handleClose}
                        aria-label={isActive ? "Mark Inactive" : "Mark Active"}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-500 hover:text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition ease-in-out duration-150"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isActive ? "M6 18L18 6M6 6l12 12" : "M12 4v16m8-8H4"} />
                        </svg>
                    </button>
                </TooltipTrigger>
                <TooltipContent align="start" alignOffset={20} side="bottom" className="bg-stone-200 text-gray-700 text-xs px-2 py-1 rounded shadow-md z-50">
                    {isActive ? "Mark Inactive" : "Mark Active"}
                </TooltipContent>
            </Tooltip>
        </div>

    )
}