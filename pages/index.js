// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';
import MyImage from './components/images';
import { useState } from 'react';
import useSWR from 'swr';

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const func = (...args) => fetch(...args).then(res => res.text());
  const { data, err } = useSWR('./data.txt', func);

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data != undefined ? data : 'error...' }
          </h5>
          
        </div>
      </Layout>
    </div>
  );
}
