// firebase-config.js

// إعدادات Firebase - استبدل هذه القيم بإعدادات مشروعك
const firebaseConfig = {
    apiKey: "AIzaSyCJjEfzsUzPU61RSsLrgVCGQtccTjhJIos",
    authDomain: "sdtora-wallet.firebaseapp.com",
    projectId: "sdtora-wallet",
    storageBucket: "sdtora-wallet.firebasestorage.app",
    messagingSenderId: "906547967025",
    appId: "1:906547967025:web:dec2f5e7f43639aff8d110"
};

// تهيئة Firebase
try {
    if (typeof firebase !== 'undefined') {
        firebase.initializeApp(firebaseConfig);
        console.log("✅ Firebase initialized successfully!");
        
        // تعريف المتغيرات العالمية
        const db = firebase.firestore();
        const auth = firebase.auth();
        
        // جعلها متاحة عالمياً
        window.db = db;
        window.auth = auth;
        
        console.log("✅ Firestore and Auth initialized!");
    } else {
        console.error("❌ Firebase SDK not loaded");
    }
} catch (error) {
    console.error("❌ Firebase initialization error:", error);
}