const router = require("express").Router();
const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

// endpoints here

// ********* CREATE METHODS ********* //

// POST a new cohort
router.post("/cohorts", (req, res) => {
  const newCohort = req.body;
  db("cohorts")
    .insert(newCohort)
    .then(ids => {
      const [id] = ids;

      db("cohorts")
        .where({ id })
        .first()
        .then(createdCohort => {
          res.status(201).json(createdCohort);
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to create new cohort" });
    });
});

// POST a new student
router.post("/students", (req, res) => {
  const newStudent = req.body;
  db("students")
    .insert(newStudent)
    .then(ids => {
      const [id] = ids;

      db("students")
        .where({ id })
        .first()
        .then(createdStudent => {
          res.status(201).json(createdStudent);
        });
    })
    .catch(error => {
      res.status(500).json({ message: "Unable to create new student" });
    });
});

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

// // GET a single student by id, replace cohort id with cohort name so that the ORM translates into the following SQL:

// select students.name, cohorts.name as cohort,
// from cohorts
// inner join students on students.cohort_id = cohorts.Id

router.get("/students/:id", (req, res) => {
  db("cohorts")
    .select("students.id", "students.name", "cohorts.name as cohort")
    .join("students", "students.cohort_id", "cohorts.id")
    .where({ "students.id": req.params.id })
    .first()
    .then(student => {
      res.status(200).json(student);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********* UPDATE METHODS ********* //

// UPDATE an existing cohort
router.put("/cohorts/:id", (req, res) => {
  cohortUpdates = req.body;
  db("cohorts")
    .where({ id: req.params.id })
    .update(cohortUpdates)
    .then(count => {
      if (count > 0) {
        db("cohorts")
          .where({ id: req.params.id })
          .first()
          .then(updatedCohort => {
            res.status(200).json(updatedCohort);
          });
      } else {
        res.status(404).json({ message: "cohort not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// UPDATE an existing student
router.put("/students/:id", (req, res) => {
  studentUpdates = req.body;
  db("students")
    .where({ id: req.params.id })
    .update(studentUpdates)
    .then(count => {
      if (count > 0) {
        db("students")
          .where({ id: req.params.id })
          .first()
          .then(updatedStudent => {
            res.status(200).json(updatedStudent);
          });
      } else {
        res.status(404).json({ message: "student not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ********* DELETE METHODS ********* //

// DELETE an existing cohort
router.delete("/cohorts/:id", (req, res) => {
  db("cohorts")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "cohort successfully deleted" });
      } else {
        res.status(404).json({ error: "cohort not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "unable to delete cohort" });
    });
});

// DELETE an existing student
router.delete("/students/:id", (req, res) => {
  db("students")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).json({ message: "student successfully deleted" });
      } else {
        res.status(404).json({ error: "student not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "unable to delete error" });
    });
});

module.exports = router;
