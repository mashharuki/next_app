// アドレスブックアプリの登録ページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';

// Firebaseのオブジェクトを取り出す (DBと認証関連)
const db = firebase.firestore();
const auth = firebase.auth();

// Addコンポーネント
export default function Add () {
    // ステート変数を用意する。
    const [ message, setMessage ] = useState('add address');
    const [ name, setName ] = useState('');
    const [ mail, setMail ] = useState('');
    const [ tel, setTel ] = useState('');
    const [ memo, setMemo ] = useState('');
    const router = useRouter();

    // 副作用フック
    useEffect (() => {
        if (auth.currentUser == null) {
            router.push('/address');
        }
    }, []);

    // 名前、メール、電話番号、メモの入力値が変化した時の処理
    const onChangeName = ((e) => {
        setName(e.target.value);
    });

    const onChangeMail = ((e) => {
        setMail(e.target.value);
    });

    const onChangeTel = ((e) => {
        setTel(e.target.value);
    });

    const onChangeMemo = ((e) => {
        setMemo(e.target.value);
    });

    // Addボタン押下時の処理
    const doAction = ((e) => {
        // オブジェクトを用意
        const ob = {
            name: name,
            mail: mail,
            tel: tel,
            memo: memo,
            flag: false
        };
        // コレクション「address」にデータを追加する。(addメソッドの呼びだし)
        db.collection('address').doc(auth.currentUser.email).collection('address').doc(mail).set(ob).then( ref => {
            // デフォルト画面にリダイレクトする。
            router.push('/address');
        } )
    });

    // go backボタン
    const goBack = (e) => {
        router.push('/address');
    }

    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Address book.">
                <div className="alert alert-primary text-center"> 
                    <h5 className="mb-4">
                        {message}
                    </h5>
                    <div className="text-left">
                        <div className="form-group">
                            <label>
                                Name:
                            </label>
                            <input type="text" onChange={onChangeName} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>
                                Mail:
                            </label>
                            <input type="text" onChange={onChangeMail} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>
                                Tel:
                            </label>
                            <input type="text" onChange={onChangeTel} className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label>
                                Memo:
                            </label>
                            <input type="text" onChange={onChangeMemo} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={doAction} className="btn btn-primary">
                        Add
                    </button>
                    <button onClick={goBack} className="btn">
                        Go Back
                    </button>
                </div>
            </Layout>
        </div>
    );
}