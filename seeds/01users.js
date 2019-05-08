exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', password: 'admin', role_id: 1 },
        { username: 'user2', password: '2', role_id: 2 },
        { username: 'user3', password: '3', role_id: 2 },
      ]);
    });
};
