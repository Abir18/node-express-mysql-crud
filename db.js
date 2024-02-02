const mysql = require("mysql2/promise");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "employee_db"
});
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "admin",
//   database: "employee_db"
// });

module.exports = connection;

// =======================CONTEXT API========================================

// import React, {createContext, useContext, useState} from "react";
// import {createRoot} from "react-dom/client";

// const MyContext = createContext({});

// const languages = ["JavaScript", "Python"];

// function App() {
//   // implement Context here so can be used in child components
//   return (
//     <MyContext.Provider value={languages}>
//       <MainSection />
//     </MyContext.Provider>
//   );
// }

// function MainSection() {
//   const data = useContext(MyContext);
//   const [favLanguage, setFavLanguage] = useState(languages[0]);

//   const handleClick = () => {
//     {
//       favLanguage === data[0]
//         ? setFavLanguage(data[1])
//         : setFavLanguage(data[0]);
//     }
//   };

//   return (
//     <div>
//       <p id="favoriteLanguage">favorite programing language: {favLanguage}</p>
//       <button
//         id="changeFavorite"
//         style={{
//           backgroundColor: "#33A533",
//           padding: "10px 20px",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer"
//         }}
//         onClick={handleClick}
//       >
//         toggle language
//       </button>
//     </div>
//   );
// }

// const container = document.getElementById("root");
// const root = createRoot(container);
// root.render(<App />);
