/**
 * 詳細セクションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - メンタル状態の詳細テキストを表示
 * - 区切り線で上部とセパレート
 * - HTMLタグを許可したテキスト表示
 * - グレーの小さめテキストでの表示
 * - 名前付きコメント機能
 */

"use client";
import { useState, useEffect } from 'react';

interface CommentData {
  id: string;
  text: string;
  createdAt: string;
  authorName: string;
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
  const [authorName, setAuthorName] = useState('');
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
    if (!newComment.trim() || !authorName.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const comment = {
        id: Math.random().toString(36).substr(2, 9),
        text: newComment,
        authorName: authorName.trim()
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
        <div className="space-y-3 mb-4">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500 italic">まだコメントはありません</p>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-700">{comment.text}</p>
                <div className="mt-1 flex items-center text-xs text-gray-500">
                  <span className="font-medium text-gray-700">{comment.authorName}</span>
                  <span className="mx-1">•</span>
                  <time>{new Date(comment.createdAt).toLocaleString()}</time>
                </div>
              </div>
            ))
          )}
        </div>

        {/* コメント投稿フォーム */}
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              placeholder="名前を入力..."
            />
          </div>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
            placeholder="コメントを入力..."
            rows={3}
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors"
              disabled={!newComment.trim() || !authorName.trim() || isLoading}
            >
              {isLoading ? '投稿中...' : '投稿する'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};