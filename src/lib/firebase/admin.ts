// src/lib/firebase/admin.ts
import * as admin from 'firebase-admin'
import serviceAccount from './keyfirebase.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })
}

export const adminDB = admin.firestore()
export const adminAuth = admin.auth()
