// ドキュメント作成ページ
import { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import firebase from 'firebase';
import '../../components/fire';
import { useRouter } from 'next/router';

// Firebaseのオブジェクトを取り出す
const db = firebase.firestore();

// Addコンポーネント
export default function Add () {
    // ステート変数を用意する。
    const [ message, setMessage ] = useState('add data');
    const [ name, setName ] = useState('');
    const [ mail, setMail ] = useState('');
    const [ age, setAge ] = useState(0);
    const router = useRouter();

    // 名前、メール、年齢の入力値が変化した時の処理
    const onChangeName = ((e) => {
        setName(e.target.value);
    });

    const onChangeMail = ((e) => {
        setMail(e.target.value);
    });

    const onChangeAge = ((e) => {
        setAge(e.target.value);
    });

    // Addボタン押下時の処理
    const doAction = ((e) => {
        // オブジェクトを用意
        const ob = {
            name: name,
            mail: mail,
            age: age
        };
        // コレクション「mydata」にデータを追加する。
        db.collection('mydata').add(ob).then( ref => {
            // デフォルト画面に遷移する。
            router.push('/fire');
        } )
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
                                Age:
                            </label>
                            <input type="text" onChange={onChangeAge} className="form-control"/>
                        </div>
                    </div>
                    <button onClick={doAction} className="btn btn-primary">
                        Add
                    </button>
                </div>
            </Layout>
        </div>
    );
}