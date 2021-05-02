// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';
import MyImage from './components/images';
import { useState } from 'react';
import useSWR from 'swr';

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const { data } = useSWR('./data.json');

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data != undefined ? data.message : 'error...' }
          </h5>
          <table className="table bg-white">
            <thead className="">
              <tr>
                <th>
                  Name
                </th>
                <th>
                  Mail
                </th>
                <th>
                  Age
                </th>
              </tr>
            </thead>
            <tbody>
              {data != undefined ? data.data.map((value, key) => (
                <tr key={key}>
                  <th>
                    {value.name}
                  </th>
                  <td>
                    {value.mail}
                  </td>
                  <td>
                    {value.age}
                  </td>
                </tr>
              )) 
              : <tr><th></th><td>no data.</td><td></td></tr> }
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
}
