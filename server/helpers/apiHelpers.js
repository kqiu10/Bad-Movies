const request = require('request');
const Axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file

const GetAllGenre = function () {
  return Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(response => {
          return response
    })
  .catch(err=>console.log("cannot get genre",err)
  )
}


const GetBestMovie = function (genreId) {
  return Axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=100&with_genres=${genreId}`)
    .then(response => {
    return response
    })
    .catch(err=>console.log("something wrong with getting movie",err)
    )

}

module.exports.Genre = GetAllGenre

module.exports.BestMovie = GetBestMovie