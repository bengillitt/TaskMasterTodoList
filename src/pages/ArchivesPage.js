// import { useEffect, useState } from "react";
// import axios from "axios";

// import ArchivesList from "../components/ArchivesList";

// const ArchivesPage = () => {
//   const [archivesArray, setArchivesArray] = useState([]);
//   const [restoreText, setRestoreText] = useState("Send to main TodoList");

//   let todoArray = [];

//   let counter = 0;

//   useEffect(() => {
//     let PrimaryArchivesArray = JSON.parse(localStorage.getItem("archiveArray"));
//     if (PrimaryArchivesArray) {
//       setArchivesArray(PrimaryArchivesArray);
//     }
//   }, []);

//   useEffect(() => {
//     if (restoreText !== "Send to main TodoList") {
//       setTimeout(() => {
//         setRestoreText("Send to main Todolist");
//       }, 3000);
//     }
//   }, [restoreText]);

//   const deleteHandler = (eventId) => {
//     let deleteArchivesArray = [];
//     for (let i = 0; i < archivesArray.length; i++) {
//       if (i !== eventId - 1) {
//         deleteArchivesArray.push(archivesArray[i]);
//       }
//     }
//     setArchivesArray(deleteArchivesArray);
//     localStorage.setItem("archiveArray", JSON.stringify(deleteArchivesArray));
//   };

//   const getItemsFromDatabase = async (formBody) => {
//     await axios({
//       method: "post",
//       url: "http://localhost:9000/getTodos",
//       data: formBody,
//     }).then((response) => (todoArray = response.data));
//   };

//   const addItemToDatabase = async (formBody) => {
//     await axios({
//       method: "post",
//       url: "http://localhost:9000/addTodo",
//       data: formBody,
//     });
//   };

//   const restoreHandler = async (eventId) => {
//     let restoreArchive;
//     let afterArchivesArray = [];

//     for (let i = 0; i < archivesArray.length; i++) {
//       if (i !== eventId - 1) {
//         afterArchivesArray.push(archivesArray[i]);
//       } else {
//         restoreArchive = archivesArray[i];
//       }
//     }

//     todoArray = JSON.parse(localStorage.getItem("todoArray"));
//     if (localStorage.getItem("isLogin") === "true") {
//       const username = localStorage.getItem("username");
//       const password = localStorage.getItem("password");

//       var details = {
//         username: username,
//         password: password,
//       };

//       var formBody = [];
//       for (var property in details) {
//         var encodedKey = encodeURIComponent(property);
//         var encodedValue = encodeURIComponent(details[property]);
//         formBody.push(encodedKey + "=" + encodedValue);
//       }
//       formBody = formBody.join("&");
//       await getItemsFromDatabase(formBody);
//     }
//     if (!todoArray.includes(restoreArchive)) {
//       setArchivesArray(afterArchivesArray);
//       localStorage.setItem("archiveArray", JSON.stringify(afterArchivesArray));

//       if (localStorage.getItem("isLogin") === "true") {
//         const username = localStorage.getItem("username");
//         const password = localStorage.getItem("password");

//         details = {
//           username: username,
//           password: password,
//           todo: restoreArchive,
//         };

//         formBody = [];
//         for (var property1 in details) {
//           encodedKey = encodeURIComponent(property1);
//           encodedValue = encodeURIComponent(details[property1]);
//           formBody.push(encodedKey + "=" + encodedValue);
//         }
//         formBody = formBody.join("&");
//         addItemToDatabase(formBody);
//       } else {
//         todoArray.push(restoreArchive);
//         localStorage.setItem("todoArray", JSON.stringify(todoArray));
//       }
//     } else {
//       setRestoreText("Todo already in TodoList");
//     }
//   };

//   return (
//     <div>
//       {archivesArray[0] ? (
//         <div>
//           {archivesArray.map((archives) => {
//             counter++;
//             return (
//               <ArchivesList
//                 key={counter}
//                 id={counter}
//                 archive={archives}
//                 delete={deleteHandler}
//                 restore={restoreHandler}
//                 restoreText={restoreText}
//               />
//             );
//           })}
//         </div>
//       ) : (
//         <h1>No Archives Found</h1>
//       )}
//     </div>
//   );
// };

// export default ArchivesPage;
