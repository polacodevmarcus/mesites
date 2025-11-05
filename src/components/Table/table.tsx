import React from "react";
import type { Mesite } from "../../store/store";

interface Column {
  key: keyof Mesite;
  label: string;
  render?: (value: Mesite[keyof Mesite], row: Mesite) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Mesite[];
  className?: string;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = ""
}) => {
  return (
    <div className={`overflow-x-auto bg-white rounded-lg shadow ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-left text-sm ${column.key === columns[0].key
                    ? 'font-normal'
                    : 'text-gray-500'
                    }`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};