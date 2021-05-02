// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';
import MyImage from './components/images';
import { useState } from 'react';
import useSWR from 'swr';

// デフォルトコンポーネント
export default function Home() {
  // ステート変数
  const [ address, setAddress ] = useState('api/hello');
  const { data, err } = useSWR(address);

  // onChange関数
  const onChange = (e) => {
    // ステート変数を設定する。
    setAddress('/api/hello?id=' + e.target.value);
  }

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            { JSON.stringify(data) }
          </h5>
          <input type="number" className="form-control" onChange={onChange} />
        </div>
      </Layout>
    </div>
  );
}
