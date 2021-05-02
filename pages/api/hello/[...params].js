import apidata from '../../components/data';

// handler関数コンポーネント
export default function handler(req, res) {
    // 変数
    const {
        query: {params: [id, item]}
    } = req;
    // result (id - 1 と  データ )
    const result = { id: id, item: apidata[id][item] };
    // JSONデータをセットする。(id + 1)番目
    res.json(result);
}