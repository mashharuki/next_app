// 各種コンポーネントを読み込む。
import Header from './header';

// デフォルトコンポーネント
export default function Home() {
  // 変数
  const title = "Next.js page";
  const message = "React Next.js sample page";

  // レンダリング
  return (
    <div>
      <Header title={title} />
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
