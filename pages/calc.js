// 計算機を表示するページ用のコンポーネント
import Layout from '../components/layout';
import Calc from '../components/Calc';

// Homeコンポーネント
export default function Home() {
    // レンダリング
    return (
        <div>
            <Layout header="Calc" title="Calculator" >
                <div className="text-center">
                    <Calc/>
                </div>
            </Layout>
        </div>
    );
}