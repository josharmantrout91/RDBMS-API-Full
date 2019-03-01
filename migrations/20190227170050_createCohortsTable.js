exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    // sets our first column as ids that will auto-increment
    tbl.increments();
    // sets an additional column of names that are required, must be unique, and cannot exceed 128 characters
    tbl
      .string("name", 128)
      .unique()
      .notNullable();
    // this will timestamp when a data value is created or updated
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("cohorts");
};
