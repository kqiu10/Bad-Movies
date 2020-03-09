const {db} = require('../models/movieModel.js');
const { Genre, BestMovie } = require('../helpers/apiHelpers.js');


//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    // get the search genre
    const id = req.query.id
    BestMovie(id)
      .then(response => {
      res.status(201).json(response.data)
      })
      .catch(err => { res.sendStatus(400);console.log(err)}
    )
    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    Genre()
      .then(response => {
      res.status(201).json(response.data)
      })
    .catch(err =>res.sendStatus(410))

  },
  saveMovie: (req, res) => {
    const data = req.body
    db.create(data,(err, data) => {
      if (err) {
        res.sendStatus(420); console.log(err)
      } else {
        res.status(201).json(data)
      }
      })

  },
  deleteMovie: (req, res) => {
    const data = req.query.id
    db.delete(data,(err, data) => {
      if (err) {
        res.sendStatus(430); console.log(err)
      } else {
        res.status(201).json(data)
      }
      })

  },
  fetchMovie: (req, res) => {
    db.get((err, data) => {
      if (err) {
        res.sendStatus(450); console.log(err)
      } else {
        res.status(201).json(data)
      }
      })

  }
}