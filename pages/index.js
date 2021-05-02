// 各種コンポーネントを読み込む。
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const title = "Next.js page";
  const message = "React Next.js sample page";
  // 以下、スタイル用の変数
  const h1 = {
    textAlign: 'right',
    padding: '5px 15px'
  }

  const p = {
    textAlign: 'left',
    margin: '0px 5px',
    color: '#669',
    fontSize: '18pt'
  }

  const subtitle = {
    textAlign: 'center',
    margin: '0px 5px',
    color: '#99d',
    fontSize: '24pt',
    fontWeight: 'bold'
  }

  // レンダリング
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous"></link>
      </Head>

      <h1 className="bg-primary text-white display-4" style={h1}>
        React
      </h1>
      <div className="container">
        <h4 className="my-3" style={subtitle} id="subtitle">
          {title}
        </h4>
        <div className="alert alert-primary text-center">
          <p className="h5" style={p} >
            {message}.
          </p>
        </div>
      </div>
    </div>
  )
}
