exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([
        { sender_user_id: 1, receiver_user_id: 3, title: 'sup', body: 'ho like scrap' },
        { sender_user_id: 3, receiver_user_id: 1, title: 'howzit', body: 'Wow cool pic cuz' },
        { sender_user_id: 2, receiver_user_id: 1, title: 'heyo', body: 'we go surf' },
        { sender_user_id: 1, receiver_user_id: 3, title: 'brahhhh', body: 'its firing' },
        { sender_user_id: 1, receiver_user_id: 4, title: 'eh cuz', body: 'das my pic brah' },
      ]);
    });
};
