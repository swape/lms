// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app'
import {getAnalytics} from 'firebase/analytics'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_APIKEY,
  authDomain: import.meta.env.PUBLIC_AUTHDOMAIN,
  projectId: import.meta.env.PUBLIC_PROJECTID,
  storageBucket: import.meta.env.PUBLIC_STORAGEBUCKET,
  messagingSenderId: import.meta.env.PUBLIC_MESSAGINGSENDERID,
  appId: import.meta.env.PUBLIC_APPID,
  measurementId: import.meta.env.PUBLIC_MEASUREMENTID
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)

export const auth = getAuth(app)

export const fireStoreDb = getFirestore(app)
