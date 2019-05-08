exports.up = function(knex, Promise) {
  return knex.schema.createTable('galleries', (table) => {
    table.increments('id');
    table.string('photo_url', 600).notNull();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('title', 600).notNull();
    table.string('author', 600).notNull();
    table.string('description', 600).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('galleries');
};
