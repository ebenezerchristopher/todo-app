import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import createList from "../functions/createlist.js";

import createTodo from "../functions/createtodo.js";

let todoConverter = {
  toFirestore: (todo) => {
    return {
      title: todo.title,
      detail: todo.detail,
      date: todo.date,
      starred: todo.starred,
      completed: todo.completed,
      id: todo.id,
    };
  },

  fromFirestore: (snapshot, options) => {
    let data = snapshot.data(options);

    return createTodo(
      data.title,
      data.detail,
      data.date,
      data.starred,
      data.completed,
      data.id
    );
  },
};

async function addUser(user) {
  let id = `${user.uid}`;
  let data = {
    name: user.displayName,
  };
  let db = getFirestore();
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this cas
    try {
      await setDoc(docRef, data);
    } catch (e) {
      console.log("Error creating user");
    }
  }
}

async function userExists(user) {
  let id = `${user.uid}`;

  let db = getFirestore();
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    // doc.data() will be undefined in this cas
    return false;
  }
}

async function addList(user, name) {
  let db = getFirestore();

  let docRef = doc(db, `users/${user.uid}/lists/${name}`);

  try {
    await setDoc(docRef, {
      name,
    });
  } catch (e) {
    console.log("something went wrong");
  }
}

async function addToDo(user, list, todo) {
  let db = getFirestore();

  let docRef = doc(
    db,
    `users/${user.uid}/lists/${list}/todos/${todo.id}`
  ).withConverter(todoConverter);

  try {
    await setDoc(
      docRef,
      createTodo(
        todo.title,
        todo.detail,
        todo.date,
        todo.starred,
        todo.completed,
        todo.id
      )
    );
  } catch (e) {
    console.log("todo couldnt be created");
  }
}

async function getTodos(user, list) {
  let db = getFirestore();
  let todos = [];

  const querySnapshot = await getDocs(
    collection(db, `users/${user.uid}/lists/${list}/todos`)
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    let todo = createTodo(
      data.title,
      data.detail,
      data.date,
      data.starred,
      data.completed,
      data.id
    );

    todos.push(todo);
  });

  return todos;
}

async function getLists(user) {
  let db = getFirestore();
  let lists = [];

  const querySnapshot = await getDocs(
    collection(db, `users/${user.uid}/lists`)
  );
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    let todos = getTodos(user, data.name);
    let listObj = createList(data.name, todos);

    lists.push(listObj);
  });

  return lists;
}

async function deleteList(user, name) {
  let db = getFirestore();

  let docRef = doc(db, `users/${user.uid}/lists/${name}`);

  docRef.delete();
}

async function deleteTodo(user, list, todo) {
  let db = getFirestore();

  let docRef = doc(db, `users/${user.uid}/lists/${list}/todos/${todo.id}`);

  docRef.delete();
}

export { addUser, userExists, addList, addToDo, getLists, deleteList, deleteTodo};
