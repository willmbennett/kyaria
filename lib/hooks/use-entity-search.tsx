import { useState, useCallback } from 'react';
import { DebouncedFunc, debounce } from 'lodash';

type FuzzyMatchingResult = {
    results: any[]; // Consider defining a more specific type for institutions
    error?: undefined;
} | {
    error: unknown;
    results?: undefined;
};

type result = {
    targetDiffbotId: string;
    name: string
}


// Define the hook's return type for clarity and maintainability
type UseEntitySearchReturnType = {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    isLoading: boolean;
    selected: result[]; // Consider defining a more specific type for selected entities
    visibleResults: result[]
    selectEntity: (entity: any) => void; // Adjust the parameter type based on your entities
    removeSelectedEntity: (id: string) => void;
    debouncedSearch: DebouncedFunc<() => Promise<void>>
};

type FuzzyMatchingReturn = {
    results?: result[],
    error?: Error
}

type SearchActionFunction = (query: string) => Promise<FuzzyMatchingReturn>;

export const useEntitySearch = (searchAction: SearchActionFunction): UseEntitySearchReturnType => {
    const [query, setQuery] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]); // Adjust with a specific type if possible
    const [selected, setSelected] = useState<any[]>([]); // Adjust with a specific type if possible

    const handleSearch = useCallback(async () => {
        if (query.length > 0) {
            setIsLoading(true);
            try {
                const response = await searchAction(query);
                if (!response.error) {
                    setResults(response.results || []);
                } else {
                    // Handle the error case
                    console.error('Search action error:', response.error);
                }
            } catch (error) {
                console.error('Failed to execute search action:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [query]);

    const debouncedSearch = useCallback(debounce(handleSearch, 500), [handleSearch]);

    const selectEntity = (entity: any) => { // Adjust the parameter type based on your entities
        if (!selected.some((selectedEntity) => selectedEntity.targetDiffbotId === entity.targetDiffbotId)) {
            setSelected([...selected, entity]);
        }
    };

    const removeSelectedEntity = (_id: string) => {
        setQuery('')
        setResults([])
        setSelected(selected.filter((entity) => entity.targetDiffbotId !== _id));
    };

    // Filter out selected institutions from the search results
    const visibleResults = results.filter(
        (entity) => !selected.some((s) => s.targetDiffbotId === entity.targetDiffbotId)
    );

    return { query, setQuery, isLoading, selected, selectEntity, visibleResults, removeSelectedEntity, debouncedSearch };
};
