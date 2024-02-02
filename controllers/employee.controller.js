const express = require("express");
const router = express.Router();
const db = require("../db");
const service = require("../services/employee.service");

router.get("/", service.getAllEmployees);
router.get("/:id", service.getEmployeeById);

router.delete("/:id", async (req, res) => {
  const affectedRows = await service.deleteEmployee(req.params.id);
  console.log(affectedRows);

  if (affectedRows === 0) {
    return res
      .status(404)
      .json("No record found with given id: " + req.params.id);
  }
  res.send("Deleted Successfully");
});

// router.post("/", async (req, res) => {
//   try {
//     await service.addOrEditEmployee(req.body);
//     res.status(201).json("Created Successfully.");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const {name, employee_code, salary} = req.body;
    const [{insertId}] = await db.query(
      `INSERT INTO employees (name, employee_code, salary) 
          VALUES (?, ?,?)`,
      [name, employee_code, salary]
    );
    res.status(202).json({
      message: "User Created"
    });
    console.log(insertId);
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const {name, employee_code, salary} = req.body;
    const update = await db.query(
      `UPDATE employees set name = ?, employee_code = ?, salary = ? where id = ?`,
      [name, employee_code, salary, id]
    );
    res.status(200).json({
      message: "updated"
    });
  } catch (err) {
    res.status(500).json({
      message: err
    });
  }
});

// router.put("/:id", async (req, res) => {
//   try {
//     const affectedRows = await service.addOrEditEmployee(
//       req.body,
//       req.params.id
//     );

//     // console.log(affectedRows);

//     if (affectedRows === 0) {
//       return res
//         .status(404)
//         .json("No record found with given id: " + req.params.id);
//     }
//     res.send("Updated Successfully.");
//   } catch (error) {
//     res.json(error.message);
//   }
// });

// router.get("/", async (req, res) => {
//   try {
//     const data = await service.getAllEmployees();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//     res.status(400).json(error);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const data = await service.getEmployeeById(req.params.id);
//     console.log(data);
//     res.send(data);
//   } catch (error) {
//     res.status(400).json({error: error.message});
//   }
// });

module.exports = router;
