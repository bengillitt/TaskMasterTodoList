import "./Todo.css";

import { useState } from "react";

const TodoItem = (props) => {
  const [isChecked, setIsChecked] = useState(false);

  const onChange = async (event) => {
    event.preventDefault();
    if (isChecked === false) {
      setIsChecked(true);
      deleteHandler(isChecked, event.target.value);
    } else if (isChecked === true) {
      stopDeletionHandler();
      console.log(isChecked);
    } else {
      console.log("error");
    }
  };

  const stopDeletionHandler = () => {
    setIsChecked(!true);
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
      {props.item}
    </div>
  );
};

export default TodoItem;
