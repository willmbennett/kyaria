export default function EmployeesSkeleton() {
  return (<>
    <div className='flex flex-col py-3'>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
            Select category
            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {/* Repeat Skeleton for 10 placeholder items */}
      {[...Array(10)].map((_, index) => (
        <div key={index} className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700 animate-pulse">
          {/* Image container with skeleton */}
          <div className="flex justify-center mt-5">
            <div className="w-32 h-32 rounded-full bg-gray-300" />
          </div>

          {/* Text skeleton */}
          <div className="p-5">
            <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="mt-4 h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
            <div className="mt-2 h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>

            {/* Link skeleton */}
            <div className="flex justify-around mt-6">
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
              <div className="w-24 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </>)
}