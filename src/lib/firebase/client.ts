// src/lib/firebase/client.ts

import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebase'

// Garante que só inicializa 1 vez
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

// Exporta os serviços
export const auth = getAuth(app)
export const db = getFirestore(app)
