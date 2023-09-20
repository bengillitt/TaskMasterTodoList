import "./Todo.css";

import { useState, useEffect } from "react";

import TodoItems from "./TodoItems";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [error, setError] = useState("");

  const [timeoutId, setTimeoutId] = useState();

  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todoArray")) {
      const primaryTodoArray = JSON.parse(localStorage.getItem("todoArray"));
      setTodoArray(primaryTodoArray);
    }
  }, []);

  useEffect(() => {
    if (error !== "" && error !== "New Todo") {
      setTimeout(() => {
        setError("New Todo");
      }, 3000);
    } else {
      setError("New Todo");
    }
  }, [error]);

  const handleChange = (event) => {
    event.preventDefault();

    const NewTodo = event.target.value;

    setTodo(NewTodo);
  };

  const removeFromArray = (todoEvent, isChecked) => {
    if (isChecked === false) {
      let removeTodoArray = todoArray;
      removeTodoArray = removeTodoArray.filter(
        (todo) => todo.toString() !== todoEvent
      );

      setTimeoutId(
        setTimeout(() => {
          setTodoArray(removeTodoArray);
          localStorage.setItem("todoArray", JSON.stringify(removeTodoArray));
        }, 2000)
      );
    } else {
      console.log("error");
    }
  };

  const stopDeletion = () => {
    clearTimeout(timeoutId);
  };

  const addTodoHandler = (event) => {
    event.preventDefault();
    if (!todoArray.includes(todo)) {
      if (todo.split(" ").join("") !== "") {
        const NewTodo = todo;

        setTodo("");

        const updateTodoArray = todoArray;
        updateTodoArray.push(NewTodo);

        setTodoArray(updateTodoArray);
        localStorage.setItem("todoArray", JSON.stringify(updateTodoArray));
      } else {
        setTodo("");
        setError("Todo cannot be blank!");
        return;
      }
    } else {
      setTodo("");
      setError("Todo is already in list!");
      return;
    }
  };

  return (
    <div>
      <div className="tododiv">
        <h2>Items</h2>
        <TodoItems
          items={todoArray}
          remove={removeFromArray}
          stopDeletion={stopDeletion}
        />
      </div>
      <form onSubmit={addTodoHandler}>
        <div className="addTodo">
          <div className="input-group mb-3 mx-3 pb-2">
            <input
              type="text"
              className="form-control"
              name="NewTodo"
              id="NewTodo"
              placeholder={error}
              aria-label="NewTodo"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={todo}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
