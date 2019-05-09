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
          author: 'BananaMan',
        },
        {
          user_id: 2,
          title: 'Mexican Point Break Slab',
          description:
            'The sandbars were groomed to near-perfection, the south swells were copious, the locals were digging him and the juice was indeed worth the 2,5000-mile squeeze.',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/04/11161145/Vissla_Surfline_Mexico__D4_6387.jpg',
          author: 'AppleMan',
        },
        {
          user_id: 3,
          title: 'Lining up the bottom turn',
          description: `“I showed up and it was fairly good, then with each day, it just got better and better and better. It was a trip. By the end of the trip, the sand was all filled in and it was epic!” Derrick, most likely toward the end of Eric’s stay.`,
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/04/11161028/Vissla_Surfline_Mexico__D4_1302-e1556084868300.jpg',
          author: 'OrangeMan',
        },
        {
          user_id: 1,
          title: 'Kelly Slater Carving Cloudbreak',
          description: 'Epic tow session with the GOAT. ',
          photo_url:
            'https://image.redbull.com/rbcom/010/2016-06-27/1331802786648_2/0100/0/1/kelly-slater-tow-surfing-cloudbreak-tavarua-fiji.jpg',
          author: 'KiwiMan',
        },
        {
          user_id: 2,
          title: 'Releasing the fins in the Arctic',
          description:
            'Chris Burkard is one of the most successful adventure/travel photographers in the world. He got his start winning FTL in 2006. ',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/03/04114905/120527_burkard_137393.jpg',
          author: 'Chris Burkard',
        },
        {
          user_id: 2,
          title: 'New Perspective',
          description:
            'Todd Glaser won FTL in 2008 and has gone on to document surfing and its surrounding culture in unique and compelling ways ever since. Currently, he’s the go-to photographer for 11-time world champ Kelly Slater.',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/03/04115803/Glasert_2019_FTL_0002.jpg',
          author: 'Todd Glaser',
        },
      ]);
    });
};
