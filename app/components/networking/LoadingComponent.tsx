// LoadingComponent.jsx
export const LoadingComponent = () => {
    return (
        <div className="bg-gray-100 rounded-lg border border-gray-200 shadow-md overflow-hidden w-full flex flex-row space-x-2 p-3 animate-pulse">
            {/* Image container with responsive image and circular style */}
            <div className="w-1/3">
                <div className="flex justify-center mt-5">
                    <div className="w-32 h-32 rounded-full flex items-center justify-center border bg-gray-300">
                        {/* Removed the SVG to enhance the grey placeholder effect */}
                    </div>
                </div>

                <div className="p-5">
                    <div className="h-6 bg-gray-300 rounded text-center"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded"></div>
                    <div className="flex justify-around space-x-2 mt-4">
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>

                    <div className="mt-2 h-4 bg-gray-200 rounded text-center"></div>
                    <ul className="mt-2">
                        <li><div className="h-4 bg-gray-200 rounded"></div></li>
                    </ul>
                </div>
            </div>
            <div className="w-2/3 text-center">
                <div className="flex justify-center space-x-4 p-4">
                    {/* Buttons replaced with divs to maintain the grey placeholder theme */}
                    <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
                    <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
                    <div className="h-10 w-1/3 bg-gray-200 rounded"></div>
                </div>

                <div>
                    <div className="h-6 bg-gray-300 rounded text-center"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};
