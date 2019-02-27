const router = require("express").Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

router.get("/cohorts", (req, res) => {
  // get the roles from the database
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(cohorts);
    });
});

router.get("/students", (req, res) => {
  // get the roles from the database
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(students);
    });
});

module.exports = router;
