import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
  const CategoryChart = ({ data }) => {
  
    return (
      <div className="bg-white rounded-xl p-5">
  
        <h2 className="text-lg font-semibold mb-4">
          Sales by Category
        </h2>
  
        <div className="w-full h-[300px]">
  
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
  
            <BarChart data={data}>
  
              <CartesianGrid strokeDasharray="3 3" />
  
              <XAxis dataKey="category" />
  
              <YAxis />
  
              <Tooltip />
  
              <Bar dataKey="sales" />
  
            </BarChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
    );
  };
  
  export default CategoryChart;