// 各種コンポーネントを読み込む。
import Link from 'next/link';
import Layout from './components/layout';

// デフォルトコンポーネント
export default function Home() {

  // レンダリング
  return (
    <div>
      <Layout header="Next.js" title="Top page.">
        <div className="alert alert-primary text-center">
          <h5 className="mb-4">
            Welcome to next.js!
          </h5>
          <Link href="./other">
            <button className="btn btn-primary">
              Go to Other page &gt;&gt;
            </button>
          </Link>
        </div>
      </Layout>
    </div>
  );
}
