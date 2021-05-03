// アドレスブックアプリの詳細情報とメッセージをやり取りするページ
// アドレスブックアプリの登録ページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';

// Firebaseのオブジェクトを取り出す (DBと認証関連)
const db = firebase.firestore();
const auth = firebase.auth();

// Infoコンポーネント
export default function Info () {
    // ステート変数を用意する。
    const [ cmt, setCmt ] = useState('');
    const [ message, setMessage ] = useState('address info');
    const [ mydata, setMydata ] = useState(null);
    const [ msgdata, setMsgdata ] = useState([]);
    const router = useRouter();
    
    // メッセージの入力値が変化した時の処理
    const onChangeCmt = ((e) => {
        setCmt(e.target.value);
    });

    // 副作用フック(ログインしていなかったらリダイレクトする。)
    useEffect (() => {
        if (auth.currentUser == null) {
            router.push('/address');
        }
    }, []);

    // Send Messageボタンを押した時の処理
    const doAction = ((e) => {
        // 作成日を取得する。
        const t = new Date().getTime();
        // メッセージ内容を作成
        const to = {
            comment: 'To: ' + cmt,
            time: t
        };
        // 送信元データを作成
        const from = {
            comment: 'From: ' + cmt,
            time: t
        }

        // 自身のアドレス内にメッセージを追加する。
        db.collection('address').doc(auth.currentUser.email).collection('address').doc(router.query.id).collection('message').add(to).then( ref => {
            // 相手のアドレス内にメッセージを追加する。
            db.collection('address').doc(router.query.id).collection('address').doc(auth.currentUser.email).collection('message').add(from).then( ref => {
                // 相手のアドレス内のflagをtrueに変更する。
                db.collection('address').doc(router.query.id).collection('address').doc(auth.currentUser.email).update({flag: true}).then( ref => {
                    // リダイレクトする。
                    router.push('/address');
                });
            });
        });
    });

    // go backボタンを押した時の処理
    const goBack = (e) => {
        router.push('/address');
    }

    // アドレスデータとメッセージを取得し表示する副作用フック
    useEffect (() => {
        // ログイン済みかどうかチェックする。
        if (auth.currentUser != null) {
            // 自身のメールアドレスをキーとしてデータを取得する。
            db.collection('address').doc(auth.currentUser.email).collection('address').doc(router.query.id).get().then ( (snapshot) => {
                // ステート変数を更新する。
                setMydata(snapshot.data());
            });
            // メッセージデータを取得する。
            db.collection('address').doc(auth.currentUser.email).collection('address').doc(router.query.id).collection('message').orderBy('time', 'desc').get().then(snapshot => {
                // メッセージデータ格納用配列
                const data = [];
                // 取り出したデータを順に取り出して表示用のデータを作成する。
                snapshot.forEach((document) => {
                    // 配列にデータを追加する。
                    data.push(
                        <li className="list-group-item px-3 py-1">
                            {document.data().comment}
                        </li>
                    );
                });
                // ステート変数を更新する。
                setMsgdata(data);
            });
            // 自身のアドレス内のflagをfalseに変更する。
            db.collection('address').doc(auth.currentUser.email).collection('address').doc(router.query.id).update({flag: false});
        } else {
            // ステート変数を更新する。
            setMessage('no data');
        }
    }, [message]);

    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Address book.">
                <div className="alert alert-primary text-center"> 
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <div className="text-left">
                        <div>
                            <div>
                                Name: {mydata != null ? mydata.name : ''}
                            </div>
                            <div>
                                Mail: {mydata != null ? mydata.mail : ''}
                            </div>
                            <div>
                                Tel: {mydata != null ? mydata.tel : ''}
                            </div>
                            <div>
                                Memo: {mydata != null ? mydata.memo : ''}
                            </div>
                        </div>
                        <hr/>
                        <div className="form-group">
                            <label>
                                Message:
                            </label>
                            <input type="text" onChange={onChangeCmt} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={doAction} className="btn btn-primary">
                        Send Message
                    </button>
                    <button onClick={goBack} className="btn">
                        Go Back
                    </button>
                </div>
                <ul className="list-group">
                   {msgdata} 
                </ul>
            </Layout>
        </div>
    );
}