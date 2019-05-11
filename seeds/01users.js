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
        { username: 'Unko2', password: bcrypt.hashSync('2', saltRounds), role_id: 2 },
        { username: 'KingK3lly', password: bcrypt.hashSync('3', saltRounds), role_id: 2 },
        { username: 'JJ4F', password: bcrypt.hashSync('4', saltRounds), role_id: 2 },
        { username: 'GromGrom5', password: bcrypt.hashSync('5', saltRounds), role_id: 2 },
        { username: 'Mase6Ho', password: bcrypt.hashSync('6', saltRounds), role_id: 2 },
        { username: '7seeBass', password: bcrypt.hashSync('7', saltRounds), role_id: 2 },
      ]);
    });
};
