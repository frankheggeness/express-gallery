const bookshelf = require('../bookshelf');

class Gallery extends bookshelf.Model {
  get tableName() {
    return 'galleries';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User');
  }
  Comments() {
    return this.hasMany('Comment');
  }
}

module.exports = bookshelf.model('Gallery', Gallery);
