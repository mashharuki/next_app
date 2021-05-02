// ヘッダー用コンポーネント
import Head from 'next/head';
import styles from '../styles/Home.module.css'

// Headerコンポーネント
export default function Header (props) {
    // レンダリング
    return (
        <Head>
        <title>{props.title}</title>
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet" crossOrigin="anonymous"></link>
      </Head>
    );
}