import React, { useEffect, useContext } from "react";
import { UserContext } from "./usercontext.jsx";
import { getLists } from "../firebase/database.js";
import Signout from "./signout.jsx";
import Header from "./header.jsx";
import Todolist from "./todolistview.jsx";

export default function Main() {
  let context = useContext(UserContext);
  let user = context.user.currentUser;
  let setContext = context.setUser;

  useEffect(() => {
    async function fetchData() {
      let data = await getLists(user);
      setContext((prev) => {
        return {
          ...prev,
          lists: data,
          active: data[0],
        };
      });
    }
    fetchData();
  }, []);

  //<Signout />
  //<Header />

  return (
    <div>
      <Signout />
      <Header />
      <Todolist  />
    </div>
  );
}
