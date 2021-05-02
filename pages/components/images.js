// イメージファイル用のコンポーネント

// MyImageコンポーネント
export default function MyImage(props) {
    // ファイル名
    let fname = './' + props.fname;
    // ファイルサイズ
    let size = props.size + "px";

    // レンダリング
    return (
        <img width={size} border="1" src={fname} />
    );
}