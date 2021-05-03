// Firebase利用向けページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';

// Firebaseのオブジェクトを取り出すこと
const db = firebase.firestore();

// Homeコンポーネント
export default function Home () {
    // 変数を用意する。
    const mydata = [];
    // ステート変数を用意する。
    const [ data, setData ] = useState(mydata);
    const [ message, setMessage ] = useState('wait...');
    
    // 副作用フック
    useEffect (() => {
        // mydataコレクションからデータを取得する。
        db.collection('mydata').get().then((snapshot) => {
            // 取り出した要素を順番に処理する。
            snapshot.forEach((document) => {
                // ドキュメントデータを取得する。
                const doc = document.data();
                // mydata配列に追加する。
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
            // ステート変数を更新しました。
            setData(mydata);
            setMessage('Firebase data.');
        });
    }, []);

    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Top page.">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">
                        {message}
                    </h5>
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
                </div>
            </Layout>
        </div>
    );
}