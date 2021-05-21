import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDdLwGXlzaPdJeUwxzcQn74AWM4-Po1ILk",
  authDomain: "fir-sample-186d0.firebaseapp.com",
  projectId: "fir-sample-186d0",
  storageBucket: "fir-sample-186d0.appspot.com",
  messagingSenderId: "1007439673179",
  appId: "1:1007439673179:web:d0991fe7dde3f5aa774c7e"
};

firebase.initializeApp(firebaseConfig);



const db = firebase.firestore();
export default firebase;

export const getFirebaseItems = async () => {
  try {
    const snapshot = await db
      .collection("todos")
      .get();
    const items = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id })
    );
    return items;
  } catch (err) {
    console.log(err);
    return [];
  }
}

export const addFirebaseItem = async (item) => {
  try {
    const todoRef = db.collection("todos");
    await todoRef.add(item);
  } catch (err) {
    console.log(err);
  }
}

export const updateFirebaseItem = async (item, id) => {
  try {
    const todoRef = db.collection("todos").doc(id);
    await todoRef.update(item);
  } catch (err) {
    console.log(err);
  }
}

export const clearFirebaseItem = async (item) => {
  const todoRef = db.collection("todos").doc(item.id);
  await todoRef.delete().then(function () {
  }).catch(function (err) {
    console.log(err);
  });
};