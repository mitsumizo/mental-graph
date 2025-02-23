import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const COMMENTS_FILE = path.join(process.cwd(), 'data', 'comments.json');

// コメントファイルの初期化を確認
async function ensureCommentsFile() {
  try {
    await fs.access(COMMENTS_FILE);
  } catch {
    await fs.mkdir(path.dirname(COMMENTS_FILE), { recursive: true });
    await fs.writeFile(COMMENTS_FILE, JSON.stringify({}));
  }
}

// GETリクエスト - コメント取得
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await ensureCommentsFile();
  const content = await fs.readFile(COMMENTS_FILE, 'utf-8');
  const comments = JSON.parse(content);

  return NextResponse.json(comments[id] || []);
}

// POSTリクエスト - コメント追加
export async function POST(request: Request) {
  const { id, comment } = await request.json();

  if (!id || !comment) {
    return NextResponse.json({ error: 'ID and comment are required' }, { status: 400 });
  }

  await ensureCommentsFile();
  const content = await fs.readFile(COMMENTS_FILE, 'utf-8');
  const comments = JSON.parse(content);

  comments[id] = comments[id] || [];
  comments[id].push({
    ...comment,
    createdAt: new Date().toISOString()
  });

  await fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 2));
  return NextResponse.json(comments[id]);
} 