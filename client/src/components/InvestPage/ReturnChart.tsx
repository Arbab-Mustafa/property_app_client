import { investmentReturns } from "@/lib/data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const formatValue = (value: number) => {
  return `£${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-neutral-200 shadow-md rounded-md">
        <p className="font-semibold">{label}</p>
        <p className="text-sm">{`Return: ${formatValue(payload[0].value)}`}</p>
      </div>
    );
  }
  return null;
};

const ReturnChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={investmentReturns}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          tick={{ fontSize: 12 }}
          height={70}
        />
        <YAxis 
          tickFormatter={formatValue}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="amount" 
          name="Annual Return" 
          fill={(entry) => entry.color} 
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ReturnChart;
