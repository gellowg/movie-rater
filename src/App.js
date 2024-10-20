import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare, faFilm, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import './App.css';
//import API from "./api-service";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";
import DeleteForm from "./components/delete-form";
import { useCookies } from "react-cookie";
import { useFetch } from './hooks/useFetch'


function App() {
    const [token, setToken, deleteToken] = useCookies(['user-token']);

    const [selectedMovie, setSelectedMovie] = useState(null)
    const [movies, setMovie] = useState(['Movie 1', 'Movie 2']);
    const [editedMovie, setEditedMovie] = useState(null);
    const [deletedMovie, setDeletedMovie] = useState(null)
    const [data, loading, error] = useFetch();

    useEffect(() => {
    if (!token['user-token']) window.location.href = '/';
}, [token]);

    useEffect(()=>{
        setMovie(data)
    }, [data])

    useEffect( () => {
        if (!token['user-token']) window.location.href = '/';
    },[token])

    const clearMovie = movie => {
        setSelectedMovie(null)
        setEditedMovie(null)
        setDeletedMovie(null)
    }

    const loadMovie = movie => {
        setSelectedMovie(movie)
        setEditedMovie(null)
        setDeletedMovie(null)

    }

    const editClicked = movie => {
        setEditedMovie(movie)
        setSelectedMovie(null)
        setDeletedMovie(null)

    }

    const deleteClicked = movie => {
        setDeletedMovie(movie)
        setSelectedMovie(null)
        setEditedMovie(null)


    }

    const updateMovieList = movie => {
        const newMovies = movies.map( mov => {
            if (mov.id === movie.id) {
                return movie;
            }
            return mov;
        })

        setEditedMovie(null)
        setDeletedMovie(null)
        setMovie(newMovies)
    }

    const newMovie = () => {
        setEditedMovie({title: '', description: ''});
        setDeletedMovie(null)
        setSelectedMovie(null)
    }

    const movieCreated = movie => {
        const newMovies = [...movies, movie];
        setMovie(newMovies)
        setDeletedMovie(null)
        setSelectedMovie(null)
    }

    const removeClicked = movie => {
        const newMovies = movies.filter( mov => mov.id !== movie.id);
        setMovie(newMovies);
    }

    const logoutUser = () => {
        deleteToken(['user-token'])
    }

    if(loading) return <h1>Loading</h1>
    if(error) return <h1>Error: {error}</h1>
    return (
    <div className="App">
      <header className="App-header">
        <h1><FontAwesomeIcon icon={faFilm} /><span>Movie Rater</span></h1>
          <FontAwesomeIcon icon={faSignOutAlt} className={'signOutIcon'} onClick={logoutUser}/>
      </header>
        <div className={"layout"}>
            <div>
            <FontAwesomeIcon icon={faPlusSquare} className={'plusIcon'} onClick={newMovie}/>
            <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} deleteClicked={deleteClicked}/>
            </div>
            <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
            { editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updateMovieList} clearMovie={clearMovie} movieCreated={movieCreated}/> : null}
            { deletedMovie ? <DeleteForm movie={deletedMovie} clearMovie={clearMovie} updatedMovie={updateMovieList} removeClicked={removeClicked}/> : null}
        </div>
    </div>
  );
}

export default App;
