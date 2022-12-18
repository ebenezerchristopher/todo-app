function createList(id, title, todos, completedTodos = [], starredTodos = []) {
  function sort() {}
  function deleteCompleted() {}
  return {
    title,
    todos,
    completedTodos,
    starredTodos, 
    sort,
    deleteCompleted,
    id,
  };
}

export default createList;
