// 各種コンポーネントを読み込む。
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const title = "Next.js page";
  const message = "React Next.js sample page";

  // レンダリング
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous"></link>
      </Head>

      <h1 className="bg-primary text-white display-4">
        React
      </h1>
      <div className="container">
        <h4 className="my-3">
          {title}
        </h4>
        <div className="alert alert-primary text-center">
          <p className="h5">
            {message}.
          </p>
        </div>
      </div>
    </div>
  )
}
