/**
 * メンタルグラフのツールチップコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - ホバー時にメンタル状態の詳細情報を表示
 * - メンタルレベルに応じた絵文字表示 (😊: 7以上, 😐: 4-6, 😢: 3以下)
 * - アニメーション付きのプログレスバーでメンタルレベルを視覚化
 * - タイトルと詳細テキストの表示
 * - 上司と自分のコメント機能
 */
"use client";

import { CustomTooltipProps } from "@/types/CustomTooltipProps";
import { useEffect, useState } from "react";
import { DetailSection } from "./mental/DetailSection";
import { MentalLevelIndicator } from "./mental/MentalLevelIndicator";

export const MentalTooltip = ({ active, payload, label, onClose }: CustomTooltipProps & { onClose?: () => void }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // SSRの場合は何も表示しない
  if (!isMounted) {
    return null;
  }

  // ツールチップのアクティブ状態とデータの存在確認
  if (!active || !payload || !payload.length) return null;

  const level = payload[0].value;
  // メンタルレベルに応じた絵文字の選択
  const emoji = level >= 7 ? '😊' : level >= 4 ? '😐' : '😢';
  // 月データを取得
  const monthData = payload[0].payload;
  // コメント用のIDを設定（idがなければmonthを使用）
  const commentId = monthData.id || monthData.month;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border border-indigo-100 
                    max-w-md w-full max-h-[90vh] overflow-y-auto animate-fade-in"
        onClick={e => e.stopPropagation()}>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-indigo-900">{label}</span>
          <span className="text-2xl">{emoji}</span>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-indigo-800">
            {monthData.month}
          </h3>
          {monthData.title && (
            <p className="text-sm text-indigo-600 mt-1">{monthData.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <MentalLevelIndicator level={level} />
          <DetailSection 
            detail={monthData.detail || ''}
            id={commentId}
          />
        </div>
      </div>
    </div>
  );
};
