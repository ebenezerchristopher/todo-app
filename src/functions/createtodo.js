function createTodo(title, detail, date, starred, completed, id, listid) {
  return {
    title,
    detail,
    date,
    starred,
    completed,
    id,
    listid
  };
}

export default createTodo