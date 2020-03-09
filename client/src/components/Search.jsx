import React from 'react';
import Axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      currentGenreId:''

    }
    this.handleGenreChange = this.handleGenreChange.bind(this)
    this.SearchVideos = this.SearchVideos.bind(this)
  }
  componentDidMount() {
    this.getGenres()
  }
  getGenres() {
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
    Axios.get('/movies/genres')
      .then(response => {

      this.setState({genres:response.data.genres})
      })
    .catch(err =>{console.log('wrong in getting genres');
    })
  }
  handleGenreChange(e) {
    this.setState({currentGenreId:e.target.value})
  }
  SearchVideos() {
    this.props.getMovies(this.state.currentGenreId)
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}
        <select onChange={this.handleGenreChange}>
        {this.state.genres.map(genre => {
          return <option key={genre.id} value = {genre.id}> {genre.name} </option>
        })}
          </select>
        <br/><br/>
        <button onClick = {this.SearchVideos}>Search</button>
      </div>
    );
  }
}

export default Search;