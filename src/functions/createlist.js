function createList(id, title,todos) {

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
    deleteCompleted, 
    id
  };
}

export default createList;
