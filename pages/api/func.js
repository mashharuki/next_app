// funcモジュールを外部から使えるようにAPI化する。
import func from '../../components/func';

// handler関数コンポーネント
export default function handler(req, res) {
    // funcモジュールをjson形式で返す。s
    res.json(func);
}