import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import service_account from "../service_account.json" assert { type: "json" };

export async function getFirestoreInstance() {
  // check if app has already been initialized
  try {
    const isInitialized = getApps().length > 0;
    if (!isInitialized) {
      // not initialized, connect to firebase
      initializeApp({
        credential: cert(service_account),
      });
    }
    return getFirestore();
  } catch (error) {
    console.error(error);
  }
}

export async function getSecrets(req, res) {
  // FIRST check if they are sending a token
  if (!req.headers || !req.headers.authorization) {
    res.status(403).send({ message: "Forbidden" });
    return;
  }
  // Connect to Firebase
  initializeApp({
    credential: cert(service_account),
  });
  // VALIDATE TOKEN
  const decoded = await getAuth().verifyIdToken(req.headers.authorization);
  if (!decoded) {
    res.status(403).send({ message: "Forbidden" });
    return;
  }
  res.send({ message: "This is top secret!" });
}
