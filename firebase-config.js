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
// دالة للتحقق إذا كان المستخدم مسؤولاً
async function isUserAdmin() {
    const user = firebase.auth().currentUser;
    if (!user) {
        console.log('No user found');
        return false;
    }

    try {
        console.log('Checking admin status for user:', user.uid);
        const userDoc = await db.collection('users').doc(user.uid).get();
        
        if (userDoc.exists) {
            const userData = userDoc.data();
            console.log('User data:', userData);
            const isAdmin = userData.role === 'admin' || userData.isAdmin === true;
            console.log('Is admin:', isAdmin);
            return isAdmin;
        } else {
            console.log('User document does not exist');
            return false;
        }
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// دالة بديلة إذا كانت هناك مشكلة
async function checkAdminAccess(userId) {
    try {
        const userDoc = await db.collection('users').doc(userId).get();
        if (userDoc.exists) {
            const userData = userDoc.data();
            return userData.role === 'admin' || userData.isAdmin === true;
        }
        return false;
    } catch (error) {
        console.error('Error in checkAdminAccess:', error);
        return false;
    }
}

// دالة للحصول على معلومات المستخدم
async function getUserRole() {
    const user = firebase.auth().currentUser;
    if (!user) return null;

    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        return userDoc.exists ? userDoc.data().role : null;
    } catch (error) {
        console.error('Error getting user role:', error);
        return null;
    }
}