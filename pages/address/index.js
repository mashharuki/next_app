// アドレスブックアプリのデフォルトページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';

// Firebaseのオブジェクトを取り出す (DBと認証関連)
const db = firebase.firestore();
const auth = firebase.auth();
// 認証プロバイダーの設定
const provider = new firebase.auth.GoogleAuthProvider();

// サインアウトする。
auth.signOut();

// Indexコンポーネント
export default function Index () {
    // アドレス用の配列
    let addresses = [];
    // ステート変数を用意する。
    const [ user, setUser ] = useState(null);
    const [ data, setDate ] = useState(addresses);
    const [ message, setMessage ] = useState('please login...');
    const router = useRouter();

    // ログイン処理
    const login = () => {
        // ポップアップ処理
        auth.signInWithPopup(provider).then( result => {
            // ステート変数を更新
            setUser(result.user.displayName);
            setMessage('logined: ' + result.user.displayName);
        }).catch ((error) => {
            setUser('NONE');
            setMessage('not logined.');
        });
    }

    // ログアウト処理
    const logout = () => {
        auth.logout();
        // ステート変数を更新する。
        setUser(null);
        addresses = [];
        setData(addresses);
        setMessage('logout...');
    }

    // LOGINEDをクリックした時の処理
    const doLogin = ((e) => {
        // ログインしていなければ、loginメソッドを呼び出す。
        if (auth.currentUser == null) {
            login();
        } else {
            logout();
        }
    });

    // add addressボタンをクリックした時の処理
    const doAction = (e) => {
        // リダイレクトする。
        router.push('/address/add');
    };

    // アドレスページへの遷移
    const doLink = (e) => {
        const id = e.target.id;
        // リダイレクト
        router.push('/address/info?id=' + id);
    }

    // 副作用フック
    useEffect (() => {
        // ログイン中かどうかチェックする。
        if (auth.currentUser != null) {
            // ステート変数を更新する。
            setUser(auth.currentUser.displayName);
            setMessage(auth.currentUser.displayName + 'さんの登録アドレス');
            // get()メソッドによりデータを取得する。
            db.collection('address').doc(auth.currentUser.email).collection('address').get().then((snapshot) => {
                // 取り出したデータを順に処理する。
                snapshot.forEach((document) => {
                    // データを取り出して格納する。
                    const doc = document.data();
                    // addressesに追加する。
                    addresses.push(
                        <li className="list-group-item list-group-item-action p-1" onClick={doLink} id={document.id}>
                            {doc.flag ? '√' : ''}{doc.name} ({doc.email})
                        </li>
                    );
                });
                setDate(addresses);
            });
        } else {
            addresses.push(
                <li key="1">
                    can't get data.
                </li>
            );
        }
    }, [message]);

    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Address book.">
                <div className="alert alert-primary text-center">
                    <h6 className="text-right" onClick={doLogin}>
                        LOGINED: {user}
                    </h6>
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <ul className="list-group">
                        {data}
                    </ul>
                    <hr/>
                    <button className="btn btn-primary" onClick={doAction} >
                        Add address
                    </button>
                </div>
            </Layout>
        </div>
    );
}