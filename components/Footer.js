// フッター部分用コンポーネント

// Footerコンポーネント
export default function Footer (props) {
    // レンダリング
    return (
        <div className="text-center h6 my-4">
            <div>
                {props.footer}
            </div>
        </div>
    );
}