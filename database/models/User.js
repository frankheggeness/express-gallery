const bookshelf = require('../bookshelf');

require('./Gallery');
class User extends bookshelf.Model {
  get tableName() {
    return 'users';
  }
  get hasTimestamps() {
    return true;
  }

  Galleries() {
    return this.hasMany('Gallery');
  }
  // siblings() {
  //   return this.hasMany('users');
  // }
}

module.exports = bookshelf.model('User', User);
