function createList(title) {
  let todos = [];
  let completedTodos = [];
  function sort() {}
  function deleteCompleted() {
    this.completedTodos = [];
  }
  return {
    title,
    todos,
    completedTodos,
    sort,
    deleteCompleted
  };
}

export default createList;