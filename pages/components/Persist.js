// ローカルストレージに保管するフック
import React, { useState } from 'react';

// 独自フック(ky: 変数, initVal:関数)
function usePersist(ky, initVal) {
    // キー値
    const key = "hooks:" + ky;
    // ローカルストレージから値を取得する関数
    const value = () => {
        try {
            // ローカルストレージからキー値に該当する値を取得
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initVal;
        } catch (err) {
            console.log(err);
            return initVal;
        }
    }
    // ローカルストレージに値を保管する関数
    const setValue = (val) => {
        try {
            // ローカルストレージに保管する。
            setSavedValue(val);
            window.localStorage.setItem(key, JSON.stringify(val));
        } catch (err) {
            console.log(err);
        }
    }
    // ステート変数を用意する。
    const [ savedValue, setSavedValue ] = useState(value);
    // 戻り値
    return [ savedValue, setValue ];
}

// コンポーネントを外部に公開
export default usePersist;