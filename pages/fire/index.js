// Firebase利用向けページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';

// Firebaseのオブジェクトを取り出す (DBと認証関連)
const db = firebase.firestore();
const auth = firebase.auth();
// 認証プロバイダーの設定
const provider = new firebase.auth.GoogleAuthProvider();

// サインアウトする。
auth.signOut();

// Homeコンポーネント
export default function Home () {
    // 変数を用意する。
    const mydata = [];
    // ステート変数を用意する。
    const [ data, setData ] = useState(mydata);
    const [ message, setMessage ] = useState('wait...');
    
    // 副作用フック1
    useEffect (() => {
        // ポップアップウィンドウでログイン
        auth.signInWithPopup(provider).then ( result => {
            setMessage('loginid: ' + result.user.displayName);
        }).catch ((error) => {
            setMessage('not logined.');
        });
    }, []);

    // 副作用フック2
    useEffect (() => {
        // 正常にログインできているかチェックする。
        if (auth.currentUser != null) {
            // mydataコレクションからデータを取得する。(getメソッドの呼び出し)
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
        } else {
            mydata.push(
                <tr key="1">
                    <th colSpan="4">
                        can't get data.
                    </th>
                </tr>
            );
        }
    }, []);

    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Top page.">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <p className="h6 text-left">
                        uid: {auth.currentUser != null ? auth.currentUser.uid : '' }<br/>
                        displayName: {auth.currentUser != null ? auth.currentUser.displayName : '' }<br/>
                        email: {auth.currentUser != null ? auth.currentUser.email : '' }<br/>
                        phoneNumber: {auth.currentUser != null ? auth.currentUser.phoneNumber : '' }
                    </p>
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