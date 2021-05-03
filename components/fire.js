// Firebaseを利用するためのFireコンポーネント
import firebase from 'firebase';

// firebaseを利用するための初期設定定数
const firebaseConfig = {
    apiKey: "AIzaSyDwzMuJHLElFpxmoSWrz3sqZKDt1gzhvQM",
    authDomain: "haruki-react1.firebaseapp.com",
    projectId: "haruki-react1",
    storageBucket: "haruki-react1.appspot.com",
    messagingSenderId: "561185658360",
    appId: "1:561185658360:web:88e3468f9edb7d74eef20d"
};

if (firebase.app.length == 0) {
    // Firebaseを初期化する。
    firebase.initializeApp(firebaseConfig);
}
