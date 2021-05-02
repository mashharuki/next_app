// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';
import MyImage from './components/images';
import { useState } from 'react';

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const url = './data.json';
  const [ data, setData ] = useState({ message:'', data:[] });

  // fecth APIでデータを扱う
  // データを取得し終わったら非同期処理を行う。
  fetch(url)
    .then(res => res.json())
    .then(res => setData(res))

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            {data.message}
          </h5>
          <table className="table bg-white">
            <thead className="table-dark">
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
              {data.data.map((value, key) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </div>
  );
}
