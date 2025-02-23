/**
 * メンタルレベルインジケーターコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - メンタルレベルをプログレスバーで視覚的に表示
 * - 0-10のレベル値を数値で表示
 * - アニメーション付きのインタラクティブな表示
 */

interface MentalLevelIndicatorProps {
  /** メンタルレベル (0-10の値) */
  level: number;
}

export const MentalLevelIndicator = ({ level }: MentalLevelIndicatorProps) => (
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
);