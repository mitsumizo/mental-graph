/**
 * 詳細セクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - メンタル状態の詳細テキストを表示
 * - 区切り線で上部とセパレート
 * - HTMLタグを許可したテキスト表示
 * - グレーの小さめテキストでの表示
 */

interface DetailSectionProps {
  /** 詳細テキスト (HTMLタグ使用可) */
  detail: string;
}

export const DetailSection = ({ detail }: DetailSectionProps) => (
  <div className="mt-3 pt-3 border-t border-gray-100">
    <p
      className="text-sm text-gray-600 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: detail }}
    />
  </div>
); 