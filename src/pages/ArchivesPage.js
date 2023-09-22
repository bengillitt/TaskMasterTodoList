import { useEffect, useState } from "react";

import ArchivesList from "../components/ArchivesList";

const ArchivesPage = () => {
  const [archivesArray, setArchivesArray] = useState([]);

  let counter = 0;

  useEffect(() => {
    let PrimaryArchivesArray = JSON.parse(localStorage.getItem("archiveArray"));
    if (PrimaryArchivesArray) {
      setArchivesArray(PrimaryArchivesArray);
    }
  }, []);

  const deleteHandler = () => {};

  return (
    <div>
      {archivesArray[0] ? (
        <div>
          {archivesArray.map((archives) => {
            counter++;
            return (
              <ArchivesList
                id={counter}
                archive={archives}
                delete={deleteHandler}
              />
            );
          })}
        </div>
      ) : (
        <h1>No Archives Found</h1>
      )}
    </div>
  );
};

export default ArchivesPage;
