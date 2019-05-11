const bookshelf = require('../bookshelf');

class Comment extends bookshelf.Model {
  get tableName() {
    return 'comments';
  }
  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User');
  }
  galleries() {
    return this.belongsTo('Gallery');
  }
}

module.exports = bookshelf.model('Comment', Comment);
