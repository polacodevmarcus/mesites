import React from "react";
import type { Mesite } from "../../types/mesites";

interface Column {
  key: keyof Mesite;
  label: string;
  render?: (value: Mesite[keyof Mesite], row: Mesite) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Mesite[];
  className?: string;
  onDelete?: (id: number, name: string) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  onDelete
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
            <tr key={index} className="hover:bg-blue-50">
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-left text-sm ${column.key === columns[0].key
                    ? 'font-normal'
                    : 'text-gray-500'
                    }`}
                >
                  {column.key === 'actions' ? (
                    <div>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id, row.name)}
                          className="text-red-500 hover:cursor-pointer"
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  ) : column.render ? (
                    column.render(row[column.key as keyof Mesite], row)
                  ) : (
                    String(row[column.key as keyof Mesite] ?? '')
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};