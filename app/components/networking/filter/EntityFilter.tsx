// components/EntityFilter.tsx
import React from 'react';

interface Entity {
    targetDiffbotId: string;
    name: string;
}

interface EntityFilterProps {
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
    results: Entity[];
    selectedEntities: Entity[];
    selectEntity: (entity: Entity) => void;
    removeSelectedEntity: (targetDiffbotId: string) => void;
    placeholder: string;
}

const EntityFilter: React.FC<EntityFilterProps> = ({
    query,
    setQuery,
    results,
    selectedEntities,
    selectEntity,
    removeSelectedEntity,
    placeholder,
}) => {
    
    return (
        <div className="flex flex-col space-y-5">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="input input-bordered input-primary w-full"
            />
            {results.length > 0 && (
                <div>
                    {results.map((entity) => (
                        <button
                            key={entity.targetDiffbotId}
                            onClick={() => selectEntity(entity)}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            {entity.name}
                        </button>
                    ))}
                </div>
            )}
            {selectedEntities.length > 0 && (
                <div className="relative mt-4 w-auto">
                    <ul>
                        {selectedEntities.map((entity) => (
                            <li key={entity.targetDiffbotId} className="inline-flex justify-start items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                                {entity.name}
                                <button onClick={() => removeSelectedEntity(entity.targetDiffbotId)} className="ml-4 text-xl text-red-500 hover:text-red-700">
                                    <span>&times;</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EntityFilter;
