 function loopy() {
  var movieLists = [{
        name: "Instant Queue",
        videos: [{
            "id": 70111470,
            "title": "Die Hard",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg"
              },
              {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 654356453,
            "title": "Bad Boys",
            "boxarts": [{
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg"
              },
              {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg"
              }

            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
              id: 432534,
              time: 65876586
            }]
          }
        ]
      },
      {
        name: "New Releases",
        videos: [{
            "id": 65432445,
            "title": "The Chamber",
            "boxarts": [{
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg"
              },
              {
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 4.0,
            "bookmark": []
          },
          {
            "id": 675465,
            "title": "Fracture",
            "boxarts": [{
                width: 200,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg"
              },
              {
                width: 150,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg"
              },
              {
                width: 300,
                height: 200,
                url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg"
              }
            ],
            "url": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": 5.0,
            "bookmark": [{
              id: 432534,
              time: 65876586
            }]
          }
        ]
      }
    ];
    //final array
    requiredArray=[];
    for( var i=0; i< movieLists.length; i++)
    {
      //count of no of videos in MovieLists
      videosLength = movieLists[i].videos.length;

      for( var j = 0 ; j< videosLength; j++)
      {
        //count of no of boxarts in videos
        boxartsLength = movieLists[i].videos[j].boxarts.length;
          for( var k = 0; k < boxartsLength; k++){
              //to check 150*200
              if (movieLists[i].videos[j].boxarts[k].width ===150 && 
                movieLists[i].videos[j].boxarts[k].height === 200)
              {
                var list = {
                  id : movieLists[i].videos[j].id,
                  title : movieLists[i].videos[j].title,
                  boxarts:movieLists[i].videos[j].boxarts[k].url
                }
                //add new list to array
                requiredArray.push(list);
                
              }
          }
      }
      
    }
//display the array
console.log(requiredArray);
}
loopy();