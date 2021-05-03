// ドキュメント作成ページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';
import data from '../../components/data';

// Firebaseのオブジェクトを取り出す
const db = firebase.firestore();

// Deleteコンポーネント
export default function Delete (props) {
    // ステート変数を用意する。
    const [ message, setMessage ] = useState('wait.');
    const [ data, setData ] = useState(null);
    const router = useRouter();

    // 副作用フック
    useEffect (() => {
        // id番号の有無によって処理を分岐する。
        if (router.query.id != undefined) { // 有りの時
            setMessage('Delete id = ' + router.query.id);
            // getメソッドの呼び出し
            db.collection('mydata').doc(router.query.id).get().then( ob => {
                // データに詰める
                setData(ob.data());
            });
        } else { //無しの時
            setMessage(message + '.');
        }
    }, [message]);

    // ボタン押した時の処理
    const doAction = (e) => {
        // 選択されたデータを消去する。(delete()関数の呼び出し)
        db.collection('mydata').doc(router.query.id).delete.then( ref => {
            // デフォルト画面にリダイレクトする。
            router.push('/fire');
        });
    }

    // レンダリングする。
    return (
        <div>
            <Layout header="Next.js" title="Top page.">
                <div className="alert alert-primary text-center">
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <pre className="card p-3 m-3 h5 text-left">
                        Name: {data != null ? data.name : '...' }<br/>
                        Mail: {data != null ? data.mail : '...' }<br/>
                        Age: {data != null ? data.age : '...' }
                    </pre>
                    <button onClick={doAction} className="btn btn-primary">
                        Delete
                    </button>
                </div>
            </Layout>
        </div>
    );
}