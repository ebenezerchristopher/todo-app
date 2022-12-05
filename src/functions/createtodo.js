function createTodo(title, detail, date, starred, completed, id) {
  return {
    title,
    detail,
    date,
    starred,
    completed,
    id,
  };
}

export default createTodo