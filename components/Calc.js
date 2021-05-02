// 計算機本体用のCalcコンポーネント
import { useState, useEffect } from 'react';
import usePersist from './Persist';

// Calcコンポーネント
export default function Calc (props) {
    // ステート変数を用意する。
    const [ message, setMessage ] = useState('');
    const [ input, setInput ] = useState('');
    const [ data, setData ] = usePersist('calc-history', []);
    const [ func, setFunc ] = useState({ func:{} });

    // データをAPI経由で取得する関数
    const fetchFunc = (address) => fetch(address).then(res => res.json());

    // 副作用フック
    useEffect(() => {
        // funcモジュールを呼び出す。
        fetchFunc('api/func').then((r) => {
            // funcに情報をセットする。
            setFunc(r);
        });
    }, [data]);

    // onChange関数
    const onChange = (e) => {
        // ステート変数を更新する。
        setInput(e.target.value);
    }

    // Enterキーを押した時の処理
    const onKeyPress = (e) => {
        // Enterキーと一致しているかチェック
        if (e.key == 'Enter') {
            // doAction関数を呼び出す。
            doAction(e);
        }
    }

    // Enter押下時の処理
    const doAction = (e) => {
        // 入力された式を計算する。
        const res = eval(input);
        setMessage(res);
        // dataに追加する。(式と答え)
        data.unshift(input + '=' + res);
        // dataを更新する。
        setData(data);
        setInput('');
    }

    // 履歴のクリア
    const clear = (e) => {
        // ステート変数を空にする。
        setData([]);
        setMessage('Clear history');
    }

    // 関数ボタンの処理
    const doFunc = (e) => {
        const arr = input.split(',');
        const fid = e.target.id;
        // 対応するIDの関数情報を格納する。
        const f = func.func[fid];
        // 計算式の情報を渡して計算する。
        const fe = eval(f.function);
        const res = fe(arr);
        // ステート変数を更新する。&data配列に追加する。
        setMessage(res);
        data.unshift(fid + '=' + res);
        setData(data);
        setInput('');
    }

    // レンダリング
    return (
        <div>
            <div className="alert alert-primary">
                <h5>
                    Result: {message}
                </h5>
                <div className="form-group">
                    <input type="text" value={input} className="form-control" onChange={onChange} onKeyPress={onKeyPress} />
                </div>
                {Object.entries(func.func).map((value, key) => (
                    <button className="btn btn-secondary m-1" key={key} title={value[1].caption} id={value[0]} onClick={doFunc} >
                        {value[0]}
                    </button>
                ))}
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            History:
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((value, key) => (
                        <tr key={key}>
                            <td>
                                {value}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={clear} className="btn btn-warning">
                Clear History
            </button>
        </div>
    );
}