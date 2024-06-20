// SearchInput.js
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { ChangeEvent } from 'react';

interface SearchInputProps {
    searchValue: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput = ({ searchValue, handleChange }: SearchInputProps) => (
    <div className="relative w-42">
        <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" />
        </div>
        <input
            type="search"
            value={searchValue}
            onChange={handleChange}
            className="block w-full pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find App..."
        />
    </div>
);
