// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import apidata from '../components/data';

// handler関数コンポーネント
export default function handler(req, res) {
  let id = req.query.id;
  // 存在しないidの時の処理
  if ( id == undefined) {
    id = 0;
  }
  // 最高値のidより大きい時の処理
  if ( id >= apidata.length ) {
    id = 0;
  }
  // JSONデータをセットする。
  res.json(apidata[id]);
}
