const express = require("express");
const app = express();
app.use(express.json());

require("express-async-errors");
const db = require("./db");
const employeeRoute = require("./controllers/employee.controller");

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at ${port}`));

// Middleware
app.use("/api/employees", employeeRoute);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);
  // console.log(err);
  // res.send(err);
});

// DB Connection
// db.query("SELECT 1")
//   .then((data) => {
//     console.log("Successfully connected to database...");
//     app.listen(port, () => console.log(`Server running at ${port}`));
//   })
//   .catch((err) => console.log("DB connection failed. \n" + err));

app.get("/hello", async (req, res) => {
  try {
    // For pool initialization, see above
    const [data] = await db.query("Show databases");
    res.send(data);
    console.log(data);

    // Connection is automatically released when query resolves
  } catch (err) {
    console.log("err");
  }
});
