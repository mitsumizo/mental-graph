import { CustomTooltipProps } from "@/types/CustomTooltipProps";
import { MentalLevelIndicator } from "./MentalLevelIndicator";
import { DetailSection } from "./DetailSection";

export const MentalTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  const level = payload[0].value;
  const emoji = level >= 7 ? '😊' : level >= 4 ? '😐' : '😢';

  return (
    <div className="transform transition-all duration-200 ease-in-out">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-indigo-100 
                    min-w-[300px] animate-fade-in">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-indigo-900">{label}</span>
          <span className="text-2xl">{emoji}</span>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-800">
            {payload[0].payload.title}
          </h3>
        </div>

        <div className="space-y-2">
          <MentalLevelIndicator level={level} />
          <DetailSection detail={payload[0].payload.detail} />
        </div>
      </div>
    </div>
  );
}; 