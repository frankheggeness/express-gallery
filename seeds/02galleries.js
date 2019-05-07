exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('galleries')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('galleries').insert([
        {
          user_id: 1,
          title: 'Gallery 1',
          description: 'This is gallery 1',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/02/08102107/Koa_Rothman_aframe_noyle__ZN14772-1.jpg',
        },
        {
          user_id: 2,
          title: 'Gallery 2',
          description: 'This is gallery 2',
          photo_url: 'https://www.surfholidays.com/assets/images/blog/2015-12-29-Kelly_Slater_Profile_Tube_ride.jpg',
        },
        {
          user_id: 3,
          title: 'Gallery 3',
          description: 'This is gallery 3',
          photo_url: 'https://i.pinimg.com/originals/23/3d/07/233d079fd3dfe3270f1c2f7f3e794b19.jpg',
        },
        {
          user_id: 1,
          title: 'Gallery 4',
          description: 'This is gallery 4',
          photo_url:
            'https://image.redbull.com/rbcom/010/2016-06-27/1331802786648_2/0100/0/1/kelly-slater-tow-surfing-cloudbreak-tavarua-fiji.jpg',
        },
      ]);
    });
};
