import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface MentalData {
  month: string;
  level: number;
  comment: string;
}

interface MentalGraphProps {
  data: MentalData[];
}

export const MentalGraph = ({ data }: MentalGraphProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const level = payload[0].value;
      const emoji = level >= 7 ? '😊' : level >= 4 ? '😐' : '😢';
      
      return (
        <div className="transform transition-all duration-200 ease-in-out">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-indigo-100 
                        min-w-[250px] animate-fade-in">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-indigo-900">{label}</span>
              <span className="text-2xl">{emoji}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-600">メンタルレベル:</div>
                <div className="flex-1 bg-gray-200 h-2 rounded-full">
                  <div 
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{ width: `${level * 10}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-indigo-600">{level}</span>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {payload[0].payload.comment}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
      <Tooltip content={<CustomTooltip />} />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="level" 
        stroke="#8884d8" 
        name="メンタル状態"
        dot={{ stroke: '#8884d8', strokeWidth: 2 }}
      />
    </LineChart>
  );
};