import React, { Component } from 'react';
import Like from './common/like';
import TableHeader from './common/tableHeader';
import TableBody from './common/tableBody';

class MoviesTable extends Component {

  // creating columns for reusable tableheader component
  columns = [
    {path: 'title', label: 'Title'},
    {path: 'genre.name', label: 'Genre'},
    {path: 'numberInStock', label: 'Stocks'},
    {path: 'dailyRentalRate', label: 'Rate'},
    // yes you can create a function as a value that takes in a parameter
    {key:'like', content: movie => <Like
                liked={movie.liked}
                onClick={() => this.props.onLike(movie)}
              /> },
    {key: 'delete', content: movie => <button
                onClick={()=> this.props.onDelete(movie)}
                className="btn btn-danger">
                Delete
              </button> }
  ]


  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props

  //--extrating movies table--//
  // 1. Destructor all the props that we are using
  // 2. import needed components
  // 3. Edit the props to the props created
  // 4. Create the props from parent table
  // 5. Make sure all the functions are named correctly and viola!
  //--end--//
  return (
    <table className="table">
      <TableHeader columns={this.columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={movies} columns={this.columns} />
    </table>
    );
  }
}



export default MoviesTable;
