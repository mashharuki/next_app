// ヘッダー用コンポーネント

// Headerコンポーネント
export default function Header (props) {
    // レンダリング
    return (
        <div>
          <h1 className="bg-primary px-3 text-white display-4 text-right">
            {props.header}
          </h1>
        </div>
    );
}