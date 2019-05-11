exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', (table) => {
    table.increments('id');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('gallery_id')
      .references('id')
      .inTable('galleries')
      .onDelete('CASCADE');
    table.string('body', 600).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
