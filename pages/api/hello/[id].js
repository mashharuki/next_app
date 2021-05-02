import apidata from '../../components/data';

// handler関数コンポーネント
export default function handler(req, res) {
    // 変数
    const {
        query: {id}
    } = req;
    // JSONデータをセットする。(id - 1)番目
    res.json(apidata[id]);
}