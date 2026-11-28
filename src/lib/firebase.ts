import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA-JfVNaeEIqoR0d_D7iw20eYOQ9jJb7yQ',
  authDomain: 'iwamad-chat-ef834.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-ef834-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-ef834',
  storageBucket: 'iwamad-chat-ef834.firebasestorage.app',
  messagingSenderId: '349347509571',
  appId: '1:349347509571:web:b0e0fb2c9dda544308ebf6',
}

export const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
