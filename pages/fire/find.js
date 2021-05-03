// ドキュメント作成ページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';

// Firebaseのオブジェクトを取り出す
const db = firebase.firestore();

// Findコンポーネント
export default function Find () {
    // ステート変数を用意する。
    const [ message, setMessage ] = useState('find data');
    const [ find, setFind ] = useState('');
    const [ data, setData ] = useState([]);
    // 配列用のデータ
    const mydata = [];

    // 検索条件が変化した時の処理
    const onChangeFind = ((e) => {
        // ステート変数を更新する。
        setFind(e.target.value);
    });

    // ボタン押した時の処理
    const doAction = ((e) => {
        // データを取得する。(getメソッド＋where句)
        db.collection('mydata').where('name', '==', find).get().then( snapshot => {
            // 取り出したデータを順に処理する。
            snapshot.forEach((document) => {
                // データを取り出す。
                const doc = document.data();
                // 配列mydataに追加する。
                mydata.push(
                    <tr key={document.id}>
                        <td>
                            <a href={'/fire/del?id=' + document.id}>
                                {document.id}
                            </a>
                        </td>
                        <td>
                            {doc.name}
                        </td>
                        <td>
                            {doc.mail}
                        </td>
                        <td>
                            {doc.age}
                        </td>
                    </tr>
                );
            });
            // ステート変数にセットする。
            setData(mydata);
            setMessage('find: ' + find);
        });
    });

    // レンダリングする。
    return (
        <div>
            <Layout header="Next.js" title="Top page.">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <div className="text-left">
                        <div className="form-group">
                            <label>
                                Find:
                            </label>
                            <input type="text" onChange={onChangeFind} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={doAction} className="btn btn-primary">
                        Find
                    </button>
                </div>
                <table className="table bg-white text-left">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Mail</th>
                            <th>Age</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}