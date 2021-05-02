// 各種コンポーネントを読み込む。
import Header from './header';
import Link from 'next/link';

// Otherコンポーネント
export default function Other() {
    // 変数
    const title = "Other";

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
                <div className="card p-3">
                    <p>
                        これは、もう一つのページです。
                    </p>
                    <Link href="/">
                        <a>
                            &lt;&lt; Back to Index page 
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}