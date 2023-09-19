import "./Todo.css";

import { useState } from "react";

import TodoItems from "./TodoItems";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [todoArray, setTodoArray] = useState([]);

  const handleChange = (event) => {
    event.preventDefault();

    const NewTodo = event.target.value;

    setTodo(NewTodo);
  };

  const removeFromArray = (todoEvent) => {
    let removeTodoArray = todoArray;

    removeTodoArray = removeTodoArray.filter(
      (todo) => todo.toString() !== todoEvent
    );

    setTodoArray(removeTodoArray);
  };

  const addTodoHandler = (event) => {
    event.preventDefault();
    if (todo.split(" ").join("") !== "") {
      const NewTodo = todo;

      setTodo("");

      console.log(...todoArray);

      const updateTodoArray = todoArray;
      updateTodoArray.push(NewTodo);

      setTodoArray(updateTodoArray);
    } else {
      setTodo("");
      return;
    }
  };

  return (
    <div>
      <div className="tododiv">
        <h2>Items</h2>
        <TodoItems items={todoArray} remove={removeFromArray} />
      </div>
      <form onSubmit={addTodoHandler}>
        <div className="addTodo">
          <div className="input-group mb-3 mx-3 pb-2">
            <input
              type="text"
              className="form-control"
              name="NewTodo"
              id="NewTodo"
              placeholder="New Todo"
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
