'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('galleries')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('galleries').insert([
        {
          user_id: 1,
          title: 'Makua Rothman Dropping In',
          description:
            'Makua Rothman was charging during this session out at an Outer Reef on the North Shore of Oahu.',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/02/08102107/Koa_Rothman_aframe_noyle__ZN14772-1.jpg',
          author: 'Zack Noyle',
        },
        {
          user_id: 2,
          title: 'Mexican Point Break Slab',
          description:
            'The sandbars were groomed to near-perfection, the south swells were copious, the locals were digging him and the juice was indeed worth the 2,5000-mile squeeze.',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/04/11161145/Vissla_Surfline_Mexico__D4_6387.jpg',
          author: 'Ben Ginsburg',
        },
        {
          user_id: 3,
          title: 'Lining Up The Bottom Turn',
          description: `“I showed up and it was fairly good, then with each day, it just got better and better and better. It was a trip. By the end of the trip, the sand was all filled in and it was epic!” Derrick, most likely toward the end of Eric’s stay.`,
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2019/04/11161028/Vissla_Surfline_Mexico__D4_1302-e1556084868300.jpg',
          author: 'Sam Lotty',
        },
        {
          user_id: 1,
          title: 'Kelly Slater Carving Cloudbreak',
          description: 'Epic tow session with the GOAT. ',
          photo_url:
            'https://image.redbull.com/rbcom/010/2016-06-27/1331802786648_2/0100/0/1/kelly-slater-tow-surfing-cloudbreak-tavarua-fiji.jpg',
          author: 'Ray Martin',
        },
        {
          user_id: 2,
          title: 'Releasing the Fins in the Arctic',
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
        {
          user_id: 3,
          title: 'Toes on the Nose',
          description:
            'Jared Mell is one of my favorite surfers to watch, I did my first trip with him when I was 15 and I remember just being blown away by the things he was doing on a longboard. All these years and he still blows my mind anytime I watch him surf.',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/11/14135415/04-JW18CN1D0351-e1542262185255.jpg',
          author: 'Jimmicane',
        },
        {
          user_id: 3,
          title: 'Kai Lenny on a Mavericks Monster',
          description:
            'First, I cornered longtime Mav’s photog/safety person Frank Quirarte. “Kai Lenny won the day for sure,” he said. “He was murdering it. It wasn’t overly gigantic. It was hitting on the third reef, but it wasn’t focusing on the bowl till this afternoon, which is when the best paddle surfing happened.”',
          photo_url: 'https://cdn.surfer.com/uploads/2018/12/kai_lenny-5017-181217-ryan_chachi_craig.jpg',
          author: 'Nikki Brooks',
        },
        {
          user_id: 2,
          title: 'Karina Rozunko Styling Down the Line',
          description:
            'Karina Rozunko is such a talented surfer, and she’s always got a good attitude. Her she is with a technical heal hang. ',
          photo_url: 'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/11/14135508/16-JW18CN1D0150.jpg',
          author: 'Dylan Gordon',
        },
        {
          user_id: 1,
          title: 'Davey van Zyl Painting the Landscape',
          description:
            'Sitting about 800 miles off the European coastline in the middle of the Atlantic Ocean are the nine islands that make up the Azores archipelago. To surfers, these islands are often thought of as a kind of European Hawaii; though to conspiracy theorists and ancient Greek philosophers like Plato, the Azores were considered to be the remains of the last continent of Atlantis. ',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/09/26111353/GregEwing_Azores_Tripwire_Surfline_009.jpg',
          author: 'Greg Ewing',
        },
        {
          user_id: 6,
          title: 'South African Bomb',
          description:
            'It’s always a gamble — the hope and mental energy one puts into the swell of the year. Do you stay put and chase big waves with the possibility of it being too wild to paddle? Do you drive up to potentially perfect points up country despite the strange winds? Or do you buy a plane ticket and fly over to a nearby island to finally get that new wave you’ve been planning on getting?',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/09/24102458/Sunset_AlanvanGysen-00991.jpg',
          author: 'Greg Ewing',
        },
        {
          user_id: 6,
          title: 'Dream from the Hilltop',
          description:
            'The first waves of the morning were big, and we knew the swell was on the rise,” Levine said. “By noon, it was huge and glassy — and only one guy fell and had to be rescued. The lips were thick enough that none of us were trying to get super deep this far away from civilization. There is no Coast Guard. There is no hospital. There are no lifeguards. There is nobody to call. We have radios that’ll be answered at the resort, or our other boats. Nobody else will answer a Mayday call.”',
          photo_url:
            'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/09/24101334/swell-22nd-Sept_Ian-Thurtell7.jpg',
          author: 'Greg Ewing',
        },
        {
          user_id: 6,
          title: 'Bawa Maxing Out',
          description:
            'Indonesia was absolutely cranking on this historic swell which sent Hawaiian-sized lines toward spots like Bawa.',
          photo_url: 'https://d14fqx6aetz9ka.cloudfront.net/wp-content/uploads/2018/08/03135106/MARCELO.jpg',
          author: 'Greg Ewing',
        },
      ]);
    });
};
