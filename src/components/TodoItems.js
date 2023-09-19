const TodoItems = (props) => {
  const deleteHandler = (event) => {
    event.preventDefault();

    props.remove(event.target.value);
  };

  return (
    <ul>
      {props.items.map((test) => {
        return (
          <li className="todoli" key={test}>
            <input
              type="checkbox"
              name="test"
              onChange={deleteHandler}
              value={test}
            />
            {test}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoItems;
