const scrapeIt = require('scrape-it')
let baseURL =
  'https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=detail&page=94'

//module.export = async function (){
async function start() {
  const fetchMovies = async () => {
    return scrapeIt(
      baseURL,
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
        if (err) {
          console.log(err)
        }
        return data
      }
    )
  }

  try {
    tick(true)()
    const raw = await fetchMovies()
    const movies = await Promise.all(formatRawData(raw.data.movies))
    const response = 'Success!' + JSON.stringify(movies)
    tick(false)(response)
    return movies
  } catch (err) {
    const response = 'Error: ' + JSON.stringify(err)
    tick(false)(response)
    return response
  }
}

const tick = start => {
  return function(response) {
    let logger = []
    let forward = true
    const decremementTheIncremement = () => {
      if (forward) {
        logger.push('.')
      } else {
        logger.pop()
      }
    }
    if (start === true) {
      console.log('...STARTING...')
      this.interval = setInterval(function() {
        if (logger.length === 5) {
          forward = false
        }
        if (logger.length === 1) {
          forward = true
        }
        decremementTheIncremement()
        console.log(logger.join(''))
      }, 800)
    } else {
      clearInterval(this.interval)
      this.interval = null
      console.log(response)
    }
  }
}
const formatRawData = async movies => {
  movies.map(movie => {
    if (movie.tags[0] !== undefined) {
      movie.tags = movie.tags[0].split(',')
    }
    let arr = movie.summary.split('\n')
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
    movie.summary = arr[7]
    movie.cast = actors
    movie.director = director
    return movie
  })
  return movies
}
// const movies = await start()
// console.log(movies)
