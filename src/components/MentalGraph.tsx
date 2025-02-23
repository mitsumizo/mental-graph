/**
 * メンタル状態を可視化するグラフコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - 月ごとのメンタル状態をラインチャートで表示
 * - メンタルレベルは0-10の範囲で表示
 * - ホバー時にツールチップで詳細情報を表示
 * - SSR/CSRの互換性に対応
 */

import { MentalGraphProps } from '@/types/MentalGraphProps';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { MentalTooltip } from './MentalTooltip';

export const MentalGraph = ({ data }: MentalGraphProps) => {
  // Next.jsのSSRとブラウザのCSRの差異を解消するためのマウント状態
  // SSR時は初期値falseで、クライアントサイドでマウント後にtrueに変更
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 初期レンダリング時（SSR時）はローディング表示
  // これによりhydrationエラーを防ぎます
  if (!isMounted) {
    return <div className="mental-graph-container">Loading...</div>;
  }

  return (
    <div className="mental-graph-container">
      {/* rechartsライブラリを使用したメンタル状態グラフの描画 */}
      <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        {/* グリッド線の設定 - 3px間隔の点線 */}
        <CartesianGrid strokeDasharray="3 3" />
        {/* X軸 - 月表示 */}
        <XAxis dataKey="month" />
        {/* Y軸 - メンタルレベル（0-10）の目盛り設定 */}
        <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} />
        {/* カスタムツールチップの設定 */}
        <Tooltip content={<MentalTooltip />} />
        {/* 凡例の表示 */}
        <Legend />
        {/* メンタル状態を示すライン */}
        <Line
          type="monotone"
          dataKey="level"
          stroke="#8884d8"
          name="メンタル状態"
          dot={{ stroke: '#8884d8', strokeWidth: 2 }}
        />
      </LineChart>
    </div>
  );
};