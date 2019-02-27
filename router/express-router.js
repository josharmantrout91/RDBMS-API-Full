const router = require("express").Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// endpoints here

// ********* CREATE METHODS ********* //

// POST a new cohort
// router.post("/cohorts", (req, res) => {
//     db("cohorts")
//     .insert()
//     .then(ids => {
//         const [id] = ids;

//         db("cohorts")
//         .where({id})
//     })
// })

// ********* READ METHODS ********* //

// GET cohorts
router.get("/cohorts", (req, res) => {
  // get the cohorts from the database
  db("cohorts")
    .then(cohorts => {
      res.status(200).json(cohorts);
    })
    .catch(error => {
      res.status(500).json(cohorts);
    });
});

// GET a single cohort by id
router.get("/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .then(cohort => {
      res.status(200).json(cohort);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// GET students
router.get("/students", (req, res) => {
  // get the students from the database
  db("students")
    .then(students => {
      res.status(200).json(students);
    })
    .catch(error => {
      res.status(500).json(students);
    });
});

// GET a single student by id
router.get("/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
