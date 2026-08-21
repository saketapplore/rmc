import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const RevenueChart = ({ data }) => {
  
    return (
      <div className="bg-white rounded-xl p-5">
  
        <h2 className="text-lg font-semibold mb-4">
          Revenue Overview
        </h2>
  
        <div className="w-full h-[300px]">
  
          <ResponsiveContainer width="100%" height="100%">
  
            <LineChart data={data}>
  
              <CartesianGrid strokeDasharray="3 3" />
  
              <XAxis dataKey="date" />
  
              <YAxis />
  
              <Tooltip />
  
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
              />
  
            </LineChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  };
  
  export default RevenueChart;