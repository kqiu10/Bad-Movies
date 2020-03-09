import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/Search.jsx'
import Movies from './components/Movies.jsx'
import Axios from 'Axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.getMovies = this.getMovies.bind(this)
    this.swapFavorites = this.swapFavorites.bind(this)
    this.saveMovie = this.saveMovie.bind(this)
    this.deleteMovie = this.deleteMovie.bind(this)

    // you might have to do something important here!
  }
  componentDidMount() {
    this.getMovies('28')
    this.GetDBMovies()
  }

  getMovies(genreId) {
    // make an Axios request to your server on the GET SEARCH endpoint
    Axios.get('/movies/search', {
      params:{id:genreId}
    })
      .then(response => {
      this.setState({movies:response.data.results})
      })
    .catch(err => console.log('fail getting movies'))
  }

  saveMovie(movie) {
    Axios.post('/movies/save', {
      id: movie.id,
      title: movie.title,
      vote_average: movie.vote_average,
      poster_path: movie.poster_path,
      release_date: movie.release_date
    }).then(() => {this.GetDBMovies()})
    .catch(err =>console.log('fail in saving movies'))

  }

  deleteMovie(movie) {
    // same as above but do something diff
    Axios.delete('/movies/delete', {
      params: { id: movie.id }
    }).then(() => {this.GetDBMovies()})
    .catch(err =>console.log('fail in deleting movies'))
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  GetDBMovies() {
     // make an Axios request to your server on the GET SEARCH endpoint
    Axios.get('/movies/fetch')
      .then(response => {
      this.setState({favorites:response.data})
      })
    .catch(err => console.log('fail fetching movies from database'))
  }

  render () {
  return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header>

        <div className="main">
          <Search swapFavorites={this.swapFavorites} showFaves={this.state.showFaves} getMovies={this.getMovies}/>
          <Movies SelectMovie={this.state.showFaves ? this.deleteMovie : this.saveMovie} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));