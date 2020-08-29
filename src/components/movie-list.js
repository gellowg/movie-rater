import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'


function MovieList(props){

    const movieClicked = movie => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }

    const deleteClicked = movie => {
        props.deleteClicked(movie);
    }



    return(
        <div>
            <h2>Movie List</h2>
            { props.movies && props.movies.map( (movie, index) => {
                return (
                    <div key={index}>
                    <h3 className={'movieName'} onClick={evt => movieClicked(movie)}>{movie.title}</h3>
                    <FontAwesomeIcon icon={faEdit} className={'editIcon'} onClick={() => editClicked(movie)}/>
                    <FontAwesomeIcon icon={faTrash} className={'trashIcon'} onClick={() => deleteClicked(movie)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieList;