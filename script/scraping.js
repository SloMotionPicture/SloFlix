const cheerio = require('cheerio')
const request = require('request')
const scrapeIt = require('scrape-it')
let movies = require('./sample_Movie_Object').data.movies
let url = 'https://www.imdb.com/list/ls057823854/'
console.log('STARTING')

let firstMovie = movies[0]
firstMovie.tags = firstMovie.tags[0].split(',')
let arr = firstMovie.description.split('\n')
console.log(arr)
const description = arr[7]
let director = []
let actors = []
let index = 9
while (arr[index] !== '                 | ') {
  let currentDirector = arr[index]
  const commaindex = currentDirector.indexOf(',')
  if (commaindex !== -1) {
    const actual = currentDirector.slice(0, commaindex)
    director.push(actual)
  } else {
    director.push(currentDirector)
  }
  index++
}
index++
index++
while (arr[index] !== '    ') {
  let currentActor = arr[index]
  const commaindex = currentActor.indexOf(',')
  if (commaindex !== -1) {
    const actual = currentActor.slice(0, commaindex)
    actors.push(actual)
  } else {
    actors.push(currentActor)
  }
  index++
}
firstMovie.description = description
firstMovie.actors = actors
firstMovie.director = director
console.log('HERE', firstMovie)

// scrapeIt(url, {
//   movies: {
//     listItem: ".lister-item",
//     data: {
//       title: ".lister-item-header>a",
//       year: ".lister-item-year",
//       img: {
//         selector: ".lister-item-image>a>img",
//         attr: "src"
//       },
//       rating: ".ipl-rating-widget>.ipl-rating-star>.ipl-rating-star__rating",
//       certificate: ".certificate",
//       runtime: ".runtime",
//       tags: {
//         listItem: ".genre"
//       },
//       description: ".lister-item-content>p"
//     }
//   }
// }, (err, data) => {
//   console.log(err || 'SUCCESS', data);
// })
