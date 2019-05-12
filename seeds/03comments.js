exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('comments').insert([
        { user_id: 1, gallery_id: 1, body: 'Wow cool pic cuz' },
        { user_id: 2, gallery_id: 1, body: 'brahhhh cherry wave' },
        { user_id: 3, gallery_id: 2, body: 'wheres this at??' },
        { user_id: 4, gallery_id: 2, body: 'perrrfect out there' },
        { user_id: 7, gallery_id: 3, body: 'hows dis bradah style' },
        { user_id: 4, gallery_id: 3, body: 'why isnt he getting shacked' },
        { user_id: 5, gallery_id: 4, body: 'too big out for me' },
        { user_id: 6, gallery_id: 4, body: 'the king killing it' },
        { user_id: 6, gallery_id: 5, body: 'brah looks cold out there, sandys mo betta' },
        { user_id: 2, gallery_id: 5, body: 'gotta dodge ice cubes out there, gnarrrr' },
        { user_id: 7, gallery_id: 6, body: 'whoaaa' },
        { user_id: 5, gallery_id: 6, body: 'looks shallow' },
        { user_id: 3, gallery_id: 7, body: 'such a fun wave cheeeHOOO' },
        { user_id: 4, gallery_id: 7, body: 'why isnt he getting shacked' },
        { user_id: 6, gallery_id: 8, body: 'this bradah is insane, sheeeeshhh' },
        { user_id: 4, gallery_id: 8, body: 'why isnt he getting shacked' },
        { user_id: 5, gallery_id: 8, body: 'nooooo thankssss' },
        { user_id: 3, gallery_id: 9, body: 'she surf mo betta den me' },
        { user_id: 4, gallery_id: 9, body: 'riiiiippinngggg' },
        { user_id: 7, gallery_id: 10, body: 'wave manini but cherreh landscape' },
        { user_id: 3, gallery_id: 10, body: 'i like surf um' },
        { user_id: 2, gallery_id: 9, body: 'mentalll' },
        { user_id: 6, gallery_id: 10, body: 'ho das mean' },
        { user_id: 5, gallery_id: 13, body: 'brah dat guy look like one ant next to dat wave' },
        { user_id: 4, gallery_id: 11, body: 'that wave is nasty cuz' },
        { user_id: 3, gallery_id: 12, body: 'supa dreamy out there' },
      ]);
    });
};
