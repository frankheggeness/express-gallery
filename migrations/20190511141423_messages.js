exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id');
    table
      .integer('sender_user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table
      .integer('receiver_user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.string('title', 600).notNull();
    table.string('body', 600).notNull();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
