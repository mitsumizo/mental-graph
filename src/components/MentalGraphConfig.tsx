/**
 * メンタルグラフの設定コンポーネント
 * 
 * このコンポーネントはrechartsライブラリを使用したグラフの設定を行います：
 * - CartesianGrid: 3px間隔の点線でグリッドを表示
 * - XAxis: 月表示の横軸
 * - YAxis: 0-10のメンタルレベルを表示する縦軸
 * - Tooltip: ホバー時に詳細情報を表示するカスタムツールチップ
 * - Legend: グラフの凡例
 * - Line: メンタル状態を示す紫色のライン
 */

import { CartesianGrid, Legend, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { MentalTooltip } from './MentalTooltip';
import { MentalData } from '@/types/MentalData';

interface MentalGraphConfigProps {
  /** メンタルデータの配列 */
  data: MentalData[];
}

export const MentalGraphConfig = ({ data }: MentalGraphConfigProps) => {
  return (
    <>
      {/* 3px間隔の点線グリッド */}
      <CartesianGrid strokeDasharray="3 3" />
      {/* 月表示の横軸 */}
      <XAxis dataKey="month" />
      {/* メンタルレベル0-10の縦軸 */}
      <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
      {/* カスタムツールチップ */}
      <Tooltip content={<MentalTooltip />} />
      {/* グラフの凡例 */}
      <Legend />
      {/* メンタル状態を示すライン */}
      <Line
        type="monotone"
        dataKey="level"
        stroke="#8884d8"
        name="メンタル状態"
        dot={{ stroke: '#8884d8', strokeWidth: 2 }}
      />
    </>
  );
}; 