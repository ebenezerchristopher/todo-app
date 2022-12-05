import React from "react";
import "./index.scss";
import PassThrough from "./components/passthrough.jsx";
import { Provider } from "./components/usercontext.jsx";


let App = () => {

  return (
    <Provider>
      <PassThrough />
    </Provider>
  );
};

export default App;
