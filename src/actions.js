import { firebaseApp } from "./firebase"
import * as firebase from "firebase"
import "firebase/firestore"

const db = firebase.firestore(firebaseApp)

export const getColletions = async (colletion) => {
  const result = { statusResponse: false, data: null, error: null };

  try {
    const data = await db.collection(colletion).get()
    const arrayData=data.docs.map(doc=>({ id: doc.id, ...doc.data()}))
    result.statusResponse=true
    result.data=arrayData
  } catch (error) {
    result.error = error;
  }

  return result
}
