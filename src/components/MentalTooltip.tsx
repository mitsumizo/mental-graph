/**
 * メンタルグラフのツールチップコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - ホバー時にメンタル状態の詳細情報を表示
 * - メンタルレベルに応じた絵文字表示 (😊: 7以上, 😐: 4-6, 😢: 3以下)
 * - アニメーション付きのプログレスバーでメンタルレベルを視覚化
 * - タイトルと詳細テキストの表示
 */

import { CustomTooltipProps } from "@/types/CustomTooltipProps";
import { MentalLevelIndicator } from "./mental/MentalLevelIndicator";
import { DetailSection } from "./mental/DetailSection";

export const MentalTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  // ツールチップのアクティブ状態とデータの存在確認
  if (!active || !payload || !payload.length) return null;

  const level = payload[0].value;
  // メンタルレベルに応じた絵文字の選択
  const emoji = level >= 7 ? '😊' : level >= 4 ? '😐' : '😢';

  return (
    <div className="transform transition-all duration-200 ease-in-out">
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-indigo-100 
                    min-w-[300px] animate-fade-in">
        {/* ヘッダー部分: 月表示と絵文字 */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-indigo-900">{label}</span>
          <span className="text-2xl">{emoji}</span>
        </div>

        {/* タイトル部分 */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-800">
            {payload[0].payload.title}
          </h3>
        </div>

        {/* メンタルレベルと詳細情報 */}
        <div className="space-y-2">
          <MentalLevelIndicator level={level} />
          <DetailSection detail={payload[0].payload.detail} />
        </div>
      </div>
    </div>
  );
};
