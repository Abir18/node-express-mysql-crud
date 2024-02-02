const db = require("../db");

module.exports.getAllEmployees = async (req, res) => {
  const [records] = await db.query(`SELECT * from employees`);
  res.send(records);
  // return record;
};

module.exports.getEmployeeById = async (req, res) => {
  try {
    const [[record]] = await db.query("SELECT * from employees WHERE id = ?", [
      req.params.id
    ]);

    if (record === undefined) {
      return res
        .status(404)
        .json("No record found with given id: " + req.params.id);
    }
    res.send(record);
  } catch (error) {
    res.json(error.message);
  }
};

module.exports.deleteEmployee = async (id) => {
  const [{affectedRows}] = await db.query(
    "DELETE FROM employees WHERE id = ?",
    [id]
  );
  return affectedRows;
};

module.exports.addOrEditEmployee = async (obj, id = 0) => {
  const [[[{affectedRows}]]] = await db.query(
    "CALL usp_employee_add_or_edit(?,?,?,?)",
    [id, obj.name, obj.employee_code, obj.salary]
  );
  console.log(affectedRows);
  return affectedRows;
};
