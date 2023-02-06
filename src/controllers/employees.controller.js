import { pool } from "../db.js";
//express-promise-router

export const getEmployees = async (req, res) => {
  try {
    const [data] = await pool.query("SELECT * FROM employee");
    res.send(data);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await pool.query("INSERT INTO employee (name, salary) VALUES (?,?)", [name, salary]);
    res.send({
      id: rows.insertId,
      name: name,
      salary: salary,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [req.params.id]);
    if (rows.length === 0)
      res.status(404).json({
        message: "Employee not found",
      });

    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const deleteEmployee = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM employee WHERE id = ?", [req.params.id]);

    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
export const putEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = ?, salary = ? WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.sendStatus(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const patchEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;

    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?,name), salary = IFNULL(?,salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0)
      return res.sendStatus(404).json({
        message: "Employee not found",
      });

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
    res.json(rows[0]);
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
