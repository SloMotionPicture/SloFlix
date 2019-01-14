const scrapeIt = require('scrape-it')
const cheerio = require('cheerio')
const jsdom = require('jsdom').jsdom
const scrape = require('website-scraper')
const fs = require('fs')
let baseURL =
  'https://www.imdb.com/list/ls057823854/?sort=list_order,asc&st_dt=&mode=detail&page=1'
const start = async () => {
  scrape({
    urls: [baseURL1, baseURL2],
    directory: './IMDB',
    sources: [
      {selector: 'img', attr: 'src'},
      {selector: 'link[rel="stylesheet"]', attr: 'href'},
      {selector: 'script', attr: 'src'}
    ]
  })
}
//start()
// To use; import this file into the seed file and call the imported function. A 'for' loop that creates a stream of data will need to be created, when the below function returns the list of 100 movies those movies should start being added to the database, while those movies are being added to the database a new scraping function should be started, when the next 100 movies are returned they should be concatenated onto the end of the array that is initially returned. This will hopefully speed up the seeding process which will be long, be patient.
// Visual feedback so you don't think you're crazy for this process taking so long
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

// //For test. Run 'node script/scraping' to run file
// const starting = async () => {
//   const movies = await scrapedData()
//   console.log(movies)
// }
// starting()

//Where the magic happens, this function scrapes movie data from IMDB, formats, and returns an array of 100 movies
const scrapedData = async url => {
  const fetchMovies = async () => {
    //Implementation of the scrape-it node module
    //The scrapeIt function requires a url, the structure of the data that you want back and a callback function
    return await scrapeIt(url, {
      movies: {
        listItem: '.lister-item',
        data: {
          title: '.lister-item-header>a',
          year: '.lister-item-year',
          imageUrl: {
            selector: '.lister-item-image>a>img',
            attr: 'loadlate'
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
    })
  }
  // Try scraping movies from IMDB and catch any errors
  try {
    tick(true)()
    const raw = await fetchMovies()
    const movies = formatRawData(raw.data.movies)
    const response = '...Success!...'
    tick(false)(response)
    return movies
  } catch (err) {
    tick(false)(err)
    return response
  }
}

const formatRawData = movies => {
  movies.map(movie => {
    if (movie.tags[0] !== undefined) {
      movie.tags = movie.tags[0].split(',')
    }
    // Custom formatting of the 'raw' data scrape-it returns
    // Minor problems with data formatting should be ironed out by hand in the database
    // Should be refactored if too many problems with the data occur
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
module.exports = scrapedData
