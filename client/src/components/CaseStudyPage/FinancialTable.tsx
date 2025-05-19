import React from "react";

interface TableItem {
  label: string;
  value: string | number;
}

interface FinancialTableProps {
  title: string;
  items: TableItem[];
  summary?: TableItem;
  backgroundColor?: string;
  textColor?: string;
}

const FinancialTable: React.FC<FinancialTableProps> = ({ 
  title, 
  items, 
  summary, 
  backgroundColor = "bg-orange-400",
  textColor = "text-black"
}) => {
  return (
    <div className={`${backgroundColor} p-8 rounded-lg shadow-md my-8 w-full`}>
      <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>{title}</h2>
      
      <div className="bg-cream-100 rounded overflow-hidden max-w-4xl mx-auto w-full">
        <div className="grid grid-cols-2 bg-cream-200 font-semibold">
          <div className="p-4 border-r border-gray-300">Item</div>
          <div className="p-4 text-right">75% (LTV)</div>
        </div>

        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-2 border-t border-gray-300">
            <div className="p-4 border-r border-gray-300">{item.label}</div>
            <div className="p-4 text-right">
              {typeof item.value === 'number' && !isNaN(item.value) && item.value >= 0 
                ? `£${item.value.toLocaleString()}`
                : item.value}
            </div>
          </div>
        ))}

        {summary && (
          <div className="grid grid-cols-2 border-t border-gray-300 bg-cream-200 font-semibold">
            <div className="p-4 border-r border-gray-300">{summary.label}</div>
            <div className="p-4 text-right">
              {typeof summary.value === 'number' 
                ? `£${summary.value.toLocaleString()}`
                : summary.value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialTable;