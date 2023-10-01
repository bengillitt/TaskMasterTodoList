import "./Todo.css";

import { useState, useEffect } from "react";

import TodoItems from "./TodoItems";

import axios from "axios";

const Todo = () => {
  const [todo, setTodo] = useState("");

  const [error, setError] = useState("");

  const [timeoutId, setTimeoutId] = useState();

  const [todoArray, setTodoArray] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  let isLogin = localStorage.getItem("isLogin");

  if (!localStorage.getItem("archiveArray")) {
    localStorage.setItem("archiveArray", JSON.stringify([]));
  }

  const getItemsFromDatabase = async (formBody) => {
    await axios({
      method: "post",
      url: "https://task-master-backend.vercel.app/getTodos",
      data: formBody,
    }).then((response) => {
      const PrimaryTodoArray = response.data;
      const SecondaryTodoArray = [];
      for (var i = 0; i < PrimaryTodoArray.length; i++) {
        SecondaryTodoArray.push(PrimaryTodoArray[i].todo);
      }
      setTodoArray(SecondaryTodoArray);
    });
    setIsLoading(false);
  };

  const removeItemFromDatabase = async (formBody) => {
    await axios({
      method: "post",
      url: "https://task-master-backend.vercel.app/removeTodo",
      data: formBody,
    }).then((response) => console.log(response.data));
  };

  const addItemToDatabase = async (formBody) => {
    await axios({
      method: "post",
      url: "https://task-master-backend.vercel.app/addTodo",
      data: formBody,
    }).then((response) => console.log(response.data));
  };

  useEffect(() => {
    if (isLogin === "true") {
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");

      var details = {
        username: username,
        password: password,
      };

      var formBody = [];
      for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      getItemsFromDatabase(formBody);
    } else if (localStorage.getItem("todoArray")) {
      const primaryTodoArray = JSON.parse(localStorage.getItem("todoArray"));
      setTodoArray(primaryTodoArray);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isLogin]);

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
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (isChecked === false) {
      let removeTodoArray = todoArray;
      removeTodoArray = removeTodoArray.filter(
        (todo) => todo.toString() !== todoEvent
      );

      setTimeoutId(
        setTimeout(() => {
          setTodoArray(removeTodoArray);
          if (isLogin === "true") {
            var details = {
              username: username,
              password: password,
              todo: todoEvent,
            };

            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            removeItemFromDatabase(formBody);
          } else {
            localStorage.setItem("todoArray", JSON.stringify(removeTodoArray));
          }

          // const archiveArray = JSON.parse(localStorage.getItem("archiveArray"));
          // archiveArray.push(todoEvent);
          // localStorage.setItem("archiveArray", JSON.stringify(archiveArray));
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
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");

        if (todo.length < 250) {
          const NewTodo = todo;

          setTodo("");

          const updateTodoArray = todoArray;
          updateTodoArray.push(NewTodo);

          setTodoArray(updateTodoArray);
          if (isLogin === "true") {
            var details = {
              username: username,
              password: password,
              todo: NewTodo,
            };

            var formBody = [];
            for (var property in details) {
              var encodedKey = encodeURIComponent(property);
              var encodedValue = encodeURIComponent(details[property]);
              formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            addItemToDatabase(formBody);
          } else {
            localStorage.setItem("todoArray", JSON.stringify(updateTodoArray));
          }
        } else {
          setTodo("");
          setError("Todo is over the 250 character limit");
        }
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
        <h2>Todo</h2>

        {isLoading ? (
          <div class="spinner-border mb-4 mt-4" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <TodoItems
            items={todoArray}
            remove={removeFromArray}
            stopDeletion={stopDeletion}
          />
        )}
      </div>
      <form onSubmit={addTodoHandler}>
        <div className="addTodo">
          <div className="input-group mx-3">
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
          <button type="submit" className="btn btn-primary addTodoButton">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Todo;
