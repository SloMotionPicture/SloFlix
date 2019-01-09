const cheerio = require('cheerio')
const request = require('request')
const scrapeIt = require('scrape-it')
let url =
  'https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=detail&page=94'
const start = async () => {
  const fetchMovies = async () => {
    console.log('...STARTING...')
    return scrapeIt(
      url,
      {
        movies: {
          listItem: '.lister-item',
          data: {
            title: '.lister-item-header>a',
            year: '.lister-item-year',
            imageUrl: {
              selector: '.lister-item-image>a>img',
              attr: 'src'
            },
            rating:
              '.ipl-rating-widget>.ipl-rating-star>.ipl-rating-star__rating',
            certificate: '.certificate',
            runtime: '.runtime',
            tags: {
              listItem: '.genre'
            },
            summary: '.lister-item-content>p'
          }
        }
      },
      (err, data) => {
        console.log(err || 'SUCCESS')
        return data
      }
    )
  }
  let data = await fetchMovies()
  let movies = data.data.movies
  movies.map(movie => {
    if (movie.tags[0] !== undefined) {
      movie.tags = movie.tags[0].split(',')
    }
    let arr = movie.summary.split('\n')
    const summary = arr[7]
    let director = []
    let actors = []
    let index = 9
    while (arr[index] !== '                 | ') {
      let currentDirector = arr[index]
      if (currentDirector !== undefined) {
        const commaindex = currentDirector.indexOf(',')
        if (commaindex !== -1) {
          const actual = currentDirector.slice(0, commaindex)
          director.push(actual)
        } else {
          director.push(currentDirector)
        }
        index++
      } else {
        break
      }
    }
    index++
    index++
    while (arr[index] !== '    ') {
      let currentActor = arr[index]
      if (currentActor !== undefined) {
        const commaindex = currentActor.indexOf(',')
        if (commaindex !== -1) {
          const actual = currentActor.slice(0, commaindex)
          actors.push(actual)
        } else {
          actors.push(currentActor)
        }
        index++
      } else {
        break
      }
    }
    movie.summary = summary
    movie.cast = actors
    movie.director = director
    return movie
  })
  console.log(movies)
  return movies
}

start()
