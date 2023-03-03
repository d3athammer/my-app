import React, { Component, useState } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { deleteMovie } from '../services/fakeMovieService';
import Like from './common/like';

class Movies extends Component {
      state = {
    movies: getMovies(),
    liked: false
   };

  deleteMovie = id => {
    deleteMovie(id)
    this.setState({movies: this.state.movies})
   }

   handleLike= (movie) => {
    const updatedMovies = [...this.state.movies];
    const index = updatedMovies[movie];
    updatedMovies[index] = [...updatedMovies[index]];
    updatedMovies[index].liked = !updatedMovies[index].liked;
     this.setState({ movies: updatedMovies });
   }

  render() {
    return (
      <div>
        <p>
          {this.state.movies === 0 ? "0 movies available" : `showing ${this.state.movies.length} movies in the database`}
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Like</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map( movie => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><Like liked={movie.liked} onClick={this.handleLike(movie)} /></td>
                <td><button onClick={()=> this.deleteMovie(movie._id)} className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Movies;
