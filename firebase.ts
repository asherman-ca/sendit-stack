import { getFirestore } from 'firebase/firestore'
import { getApp, getApps, initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyBauJ6vzcumvxK9IQUGotdmRXlJN-jt7oI',
	authDomain: 'sendit-stack.firebaseapp.com',
	projectId: 'sendit-stack',
	storageBucket: 'sendit-stack.appspot.com',
	messagingSenderId: '506956795216',
	appId: '1:506956795216:web:0ae2cc0ab9684b06463055',
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app)

export { db, app, storage }
