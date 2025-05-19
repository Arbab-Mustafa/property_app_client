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

const FinancialTable = ({
  title,
  items,
  summary, 
  backgroundColor = "bg-orange-400",
  textColor = "text-black"
}: FinancialTableProps) => {
  return (
    <div className={`${backgroundColor} p-8 shadow-md w-full`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-3xl font-bold mb-6 text-center ${textColor}`}>{title}</h2>
        
        <div className="bg-cream-100 rounded overflow-hidden w-full">
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
    </div>
  );
};

export default FinancialTable;