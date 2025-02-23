"use client";

// 必要なrechartsのコンポーネントとReactのフックをインポート
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from 'react';

// データの型定義を更新
interface MentalData {
  month: string;    // 月の文字列
  level: number;    // メンタルレベル（0-10）
  title: string;    // その月のタイトル
  detail: string;   // 詳細な説明
}

// コンポーネントのProps型定義
interface MentalGraphProps {
  data: MentalData[];
}

export const MentalGraph = ({ data }: MentalGraphProps) => {
  // カスタムツールチップコンポーネントを更新
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const level = payload[0].value;
      const emoji = level >= 7 ? '😊' : level >= 4 ? '😐' : '😢';
      
      return (
        <div className="transform transition-all duration-200 ease-in-out">
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-indigo-100 
                        min-w-[300px] animate-fade-in">
            {/* ヘッダー部分：月と絵文字 */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xl font-bold text-indigo-900">{label}</span>
              <span className="text-2xl">{emoji}</span>
            </div>
            
            {/* タイトル */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-indigo-800">
                {payload[0].payload.title}
              </h3>
            </div>

            <div className="space-y-2">
              {/* メンタルレベルのプログレスバー */}
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
              
              {/* 詳細説明 */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p 
                  className="text-sm text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: payload[0].payload.detail }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  // SSRとCSRの差異を解消するためのマウント状態管理
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 初期レンダリング時はローディング表示
  if (!isMounted) {
    return <div className="mental-graph-container">Loading...</div>;
  }

  return (
    <div className="mental-graph-container">
      {/* rechartsを使用したラインチャートの描画 */}
      <LineChart width={800} height={400} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 10]} ticks={[0, 2, 4, 6, 8, 10]} /> {/* メンタルレベルは0-10の範囲 */}
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
    </div>
  );
};