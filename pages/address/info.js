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
    
    // レンダリング
    return (
        <div>
            <Layout header="Next.js" title="Address book.">
                <div className="alert alert-primary text-center"> 
                    <h5 className="mb-4">
                        {message}
                    </h5>

                </div>
            </Layout>
        </div>
    );
}