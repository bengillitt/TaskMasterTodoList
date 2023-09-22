const ArchivesList = (props) => {
  return (
    <div key={props.id}>
      {props.archive}
      <button type="button" class="btn btn-outline-primary">
        Send to main TodoList
      </button>
      <button type="button" class="btn btn-outline-danger">
        Delete Archive
      </button>
    </div>
  );
};

export default ArchivesList;
