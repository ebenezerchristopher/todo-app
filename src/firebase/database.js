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
  deleteDoc,
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
      listid: todo.listid,
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
      data.id,
      data.listid
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

async function addList(user, id, name) {
  let db = getFirestore();

  let docRef = doc(db, `users/${user.uid}/lists/${id}`);

  try {
    return setDoc(docRef, {
      name,
      id,
    });
  } catch (e) {
    console.log("something went wrong");
  }
}

async function addToDo(user, todo) {
  let db = getFirestore();

  let docRef = doc(
    db,
    `users/${user.uid}/lists/${todo.listid}/todos/${todo.id}`
  ).withConverter(todoConverter);

  try {
    return setDoc(docRef, todo);
  } catch (e) {
    console.log("todo couldnt be created");
  }
}

async function getTodos(user, list) {
  let db = getFirestore();
  let todos = [];
  let completed = [];
  let starred = [];

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
      data.id,
      data.listid
    );
    if (todo.starred) {
      starred.push(todo);
    }
    if (todo.completed) {
      completed.push(todo);
    }
    todos.push(todo);
  });

  return {
    todos,
    completed,
    starred,
  };
}

async function getLists(user) {
  let db = getFirestore();
  let lists = [];

  const querySnapshot = await getDocs(
    collection(db, `users/${user.uid}/lists`)
  );

  for (const doc of querySnapshot.docs) {
    // doc.data() is never undefined for query doc snapshots
    let data = doc.data();
    let todosObj = await getTodos(user, data.id);
    let listObj = createList(
      data.id,
      data.name,
      todosObj.todos,
      todosObj.completed,
      todosObj.starred
    );

    lists.push(listObj);
  }

  return lists;
}

async function deleteList(user, id, todos) {
  let db = getFirestore();

  let docRef = doc(db, `users/${user.uid}/lists/${id}`);

  if (todos.length) {
    for (let todo of todos) {
      deleteTodo(user, todo);
    }
  }

 return deleteDoc(docRef);
}

async function deleteTodo(user, todo) {
  let db = getFirestore();

  let docRef = doc(
    db,
    `users/${user.uid}/lists/${todo.listid}/todos/${todo.id}`
  );

  return deleteDoc(docRef);
}

async function updateTodos(user, todo, object) {
  let db = getFirestore();
  let docRef = doc(
    db,
    `users/${user.uid}/lists/${todo.listid}/todos/${todo.id}`
  );

  return await updateDoc(docRef, object);
}

export {
  addUser,
  userExists,
  addList,
  addToDo,
  getLists,
  deleteList,
  deleteTodo,
  updateTodos,
};
