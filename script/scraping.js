const cheerio = require('cheerio')
const request = require('request')
const scrapeIt = require('scrape-it')
let movies = require('./sample_Movie_Object').data.movies
let url = 'https://www.imdb.com/list/ls057823854/'
console.log('STARTING')

let firstMovie = movies[9]
firstMovie.tags = firstMovie.tags[0].split(',')
let arr = firstMovie.description.split('\n')
console.log(arr)
const description = arr[7]
let director = []
let actors = []
let index = 9
while (arr[index] !== '                 | ') {
  director.push(arr[index])
  index++
}
index++
index++
while (arr[index] !== '    ') {
  actors.push(arr[index])
  index++
}
console.log('HERE', director, actors)
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
