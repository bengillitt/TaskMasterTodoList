const ArchivesList = (props) => {
  const deleteHandler = () => {
    props.delete(props.id);
  };

  const restoreHandler = () => {
    props.restore(props.id);
  };

  return (
    <div>
      {props.archive}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={restoreHandler}
      >
        {props.restoreText}
      </button>
      <button
        type="button"
        className="btn btn-outline-danger"
        onClick={deleteHandler}
      >
        Delete Archive
      </button>
    </div>
  );
};

export default ArchivesList;
