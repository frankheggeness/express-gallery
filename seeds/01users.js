'use strict';

const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'admin', password: bcrypt.hashSync('admin', saltRounds), role_id: 1 },
        { username: 'user2', password: bcrypt.hashSync('2', saltRounds), role_id: 2 },
        { username: 'user3', password: bcrypt.hashSync('3', saltRounds), role_id: 2 },
      ]);
    });
};
