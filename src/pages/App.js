import "./App.css";
import Todo from "../components/ToDo";
import Header from "./Header";

import { useState, useEffect } from "react";

function App() {
  const [isLogin, setIsLogin] = useState("");

  useEffect(() => {
    const isLoginString = localStorage.getItem("isLogin");
    if (isLoginString === "true") {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="app">
      <Header isLogin={isLogin} />
      <Todo />
    </div>
  );
}

export default App;
