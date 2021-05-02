// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';
import MyImage from './components/images';
import { useState } from 'react';
import useSWR from 'swr';

// デフォルトコンポーネント
export default function Home() {
  // ステート変数
  const [ pref, setPref ] = useState({ id: 0, item: 'name' });
  const [ address, setAddress ] = useState('api/hello/' + pref.id + '/' + pref.item);
  // useSWR (独自副作用フック)
  const { data, err } = useSWR(address);

  // onChange関数
  const onChange = (e) => {
    // idをセット
    pref.id = e.target.value;
    // ステート変数を設定する。
    setPref(pref);
    setAddress('/api/hello/' + pref.id + '/' + pref.item);
  }

  // onSelect関数
  const onSelect = (e) => {
    // idをセット
    pref.name = e.target.value;
    // ステート変数を設定する。
    setPref(pref);
    setAddress('/api/hello/' + pref.id + '/' + pref.item);
  }

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            { JSON.stringify(data) }
          </h5>
          <input type="number" className="form-control form-control-sm mb-2" onChange={onChange} />
          <select onChange={onSelect} className="form-control form-control-sm">
            <option value="name">Name</option>
            <option value="mail">Mail</option>
            <option value="age">Age</option>
          </select>
        </div>
      </Layout>
    </div>
  );
}
