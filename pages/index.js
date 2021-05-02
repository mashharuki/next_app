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

      <style jsx>{`
        h1 {
          text-align: center;
        }

        h2 {
          text-align: center;
          margin: 0px 5px;
          color: #aad;
          font-size: 36pt;
          font-weight: bold;
        }

        p {
          text-align: left;
          margin: 0px 5px;
          color: blue;
          fontSize: 18pt;
        }      
      `}</style>

      <h1 className="bg-primary text-white display-4">
        React
      </h1>
      <div className="container">
        <h2 className="my-3 subtitle">
          {title}
        </h2>
        <div className="alert alert-primary text-center">
          <p className="h5" >
            {message}.
          </p>
        </div>
      </div>
    </div>
  )
}
