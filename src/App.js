import { useState } from "react";

import "./App.css";
import Article from "./components/Article";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Article />
    </>
  );
}

export default App;
