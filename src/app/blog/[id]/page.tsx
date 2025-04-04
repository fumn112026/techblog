import { client } from '../../../libs/microcms/client';
import dayjs from 'dayjs';

// ブログ記事の型定義
type Props = {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
}

async function getBlogPost(id: string): Promise<Props> {
  const data = await client.get({
    endpoint: `blog/${id}`,
  });
  return data;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getBlogPost(id);

  const formattedDate = dayjs(post.publishedAt).format('YY.MM.DD');

  return (
    <main>
      <h1>{post.title}</h1>
      <div>{formattedDate}</div>
      {/* 現時点で入力はmicroCMSのエディタからのみ。ユーザから直接入力受け取る場合は要修正 */}
      <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
    </main>
  )
}

export async function generateStaticParams() {
  const contentIds = await client.getAllContentIds({ endpoint: 'blog' });

  return contentIds.map((contentId) => ({
    id: contentId,
  }));
}
