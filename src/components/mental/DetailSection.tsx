/**
 * 詳細セクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - メンタル状態の詳細テキストを表示
 * - 区切り線で上部とセパレート
 * - HTMLタグを許可したテキスト表示
 * - グレーの小さめテキストでの表示
 * - クリックでコメントモーダルを表示
 */

"use client";
import { useState, useEffect } from 'react';

interface CommentData {
  id: string;
  text: string;
  createdAt: string;
  author: string;
}

interface DetailSectionProps {
  /** 詳細テキスト (HTMLタグ使用可) */
  detail: string;
  /** 一意の識別子 */
  id: string;
}

export const DetailSection = ({ detail, id }: DetailSectionProps) => {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?id=${id}`);
        const data = await response.json();
        setComments(data.map((comment: CommentData) => ({
          ...comment,
          createdAt: new Date(comment.createdAt)
        })));
      } catch (error) {
        console.error('コメントの取得に失敗しました:', error);
      }
    };
    fetchComments();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        text: newComment,
        author: 'ユーザー'
      };

      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          comment
        }),
      });

      const updatedComments = await response.json();
      setComments(updatedComments.map((comment: CommentData) => ({
        ...comment,
        createdAt: new Date(comment.createdAt)
      })));
      setNewComment('');
    } catch (error) {
      console.error('コメントの投稿に失敗しました:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-3 pt-3 border-t border-gray-100 max-w-lg mx-auto">
      {/* 詳細テキスト */}
      <div
        className="text-sm text-gray-600 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: detail }}
      />

      {/* コメントセクション */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">コメント</h4>

        {/* コメント一覧 */}
        <div className="space-y-2 mb-4">
          {comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">{comment.text}</p>
              <div className="mt-1 flex items-center text-xs text-gray-500">
                <span>{comment.author}</span>
                <span className="mx-1">•</span>
                <time>{comment.createdAt.toLocaleString()}</time>
              </div>
            </div>
          ))}
        </div>

        {/* コメント投稿フォーム */}
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-lg text-sm"
            placeholder="コメントを入力..."
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
            disabled={!newComment.trim() || isLoading}
          >
            {isLoading ? '投稿中...' : '投稿する'}
          </button>
        </form>
      </div>
    </div>
  );
};