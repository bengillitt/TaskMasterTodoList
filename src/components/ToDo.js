import "./Todo.css";

import { useState, useEffect } from "react";

import TodoItems from "./TodoItems";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [error, setError] = useState("");

  const [toBeDeleted, setToBeDeleted] = useState("");

  const [timeoutId, setTimeoutId] = useState();

  const [todoArray, setTodoArray] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setError("New Todo");
    }, 3000);
  }, [error]);

  useEffect(() => {
    if (toBeDeleted !== "") {
      let removeTodoArray = todoArray;

      removeTodoArray = removeTodoArray.filter(
        (todo) => todo.toString() !== toBeDeleted
      );

      setTimeoutId(
        setTimeout(() => {
          setTodoArray(removeTodoArray);
        }, 5000)
      );
      setToBeDeleted("");
    }
  }, [toBeDeleted, todoArray]);

  const handleChange = (event) => {
    event.preventDefault();

    const NewTodo = event.target.value;

    setTodo(NewTodo);
  };

  const removeFromArray = (todoEvent, isChecked) => {
    if (isChecked === false) {
      setToBeDeleted(todoEvent);
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
