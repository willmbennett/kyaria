// components/NameList.tsx
import React from 'react';

interface NameListProps {
  data?: { Name: string }[];
  title: string;
}

const NameList: React.FC<NameListProps> = ({ data = [], title }) => {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {data.length > 0 ? (
        <ul>
          {data.map((item, idx) => (
            <li key={idx} className="mb-3">
              <p className="font-medium">{item.Name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available.</p>
      )}
    </div>
  );
};

export default NameList;
