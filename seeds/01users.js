exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'test', password: 'test' },
        { username: 'user2', password: 'test2' },
        { username: 'user3', password: 'test3' },
      ]);
    });
};
