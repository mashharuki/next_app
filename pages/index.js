// 各種コンポーネントを読み込む。
import Header from './components/Header';
import Link from 'next/link';

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const title = "Index";

  // レンダリング
  return (
    <div>
      <Header title={title} />
      <h1 className="bg-primary text-white display-4 px-3">
        React
      </h1>
      <div className="container">
        <h3 className="my-3 text-primary text-center">
          {title}
        </h3>
        <div className="card p-3 text-center">
          <p>
            これは、ページ移動のサンプルです。
          </p>
          <Link href="/other">
            <a>
              Go to Other page &gt;&gt;
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
