import "./Todo.css";
import TodoItem from "./TodoItem";

const TodoItems = (props) => {
  const deleteHandler = (todoItem, isChecked) => {
    props.remove(todoItem, isChecked);
  };

  const stopDeletionHandler = () => {
    props.stopDeletion();
  };

  return (
    <ul>
      {props.items.map((item) => {
        return (
          <li className="todoli" key={item}>
            <div className="input-group mb-3 todoli">
              <div className="input-group-text todoli">
                <TodoItem
                  item={item}
                  remove={deleteHandler}
                  stopDeletion={stopDeletionHandler}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoItems;
