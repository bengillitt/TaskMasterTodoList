import "./Todo.css";

import { useState } from "react";

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = async (event) => {
    if (isChecked === false) {
      setIsChecked(true);
      console.log(event.target.value);
      console.log(isChecked);
      deleteHandler(isChecked, event.target.value);
      console.log(isChecked);
    } else if (isChecked === true) {
      stopDeletionHandler();
      setIsChecked(false);
      console.log(isChecked);
    } else {
      console.log("error");
    }
  };

  const stopDeletionHandler = () => {
    props.stopDeletion();
  };

  const deleteHandler = async (isChecked, todoItem) => {
    props.remove(todoItem, isChecked);
  };

  return (
    <div className="todoli">
      <input
        className="form-check-input mt-0"
        type="checkbox"
        onChange={onChange}
        checked={isChecked}
        value={props.item}
        aria-label="Checkbox for following text input"
      />
      <p className="todoContent">{props.item}</p>
    </div>
  );
};

export default TodoItem;
