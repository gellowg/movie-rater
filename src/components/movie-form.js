import React, { useState, useEffect } from 'react';
import API from '../api-service'
import { useCookies } from "react-cookie";


function MovieForm(props) {

    const [token] = useCookies(['user-token']);

    const [ title, setTitle ] = useState(props.movie.title);
    const [ description, setDescription ] = useState(props.movie.description);

    const isDisabled = title.length === 0 || description.length === 0;


    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description}, token['user-token'])
            .then( resp => props.updatedMovie(resp))
            .catch( error => console.log(error))
    }

    const createClicked = () => {
        API.createMovie({title, description}, token['user-token'])
            .then( resp => props.movieCreated(resp))
            .catch( error => console.log(error))
    }



    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
    }, [props.movie])

    return (
        <React.Fragment>
            { props.movie ? (
                <div className={'EditForm'}>
                <label htmlFor={'title'} >Title</label> <br/>
                <input id={'title'} type="text" placeholder={'Title'} value={title} onChange={ evt => setTitle(evt.target.value)}/> <br/> <br/>

                <label htmlFor={'description'}>Description</label> <br/>
                <textarea id={'description'} type="text" placeholder={'Description'} value={description} onChange={ evt => setDescription(evt.target.value)}/> <br/>
                    { props.movie.id ?
                        <button onClick={updateClicked} disabled={isDisabled}>Update</button> :
                        <button onClick={createClicked} disabled={isDisabled}>Create</button>

                    }
                </div>
            ): null }
            </React.Fragment>

            )
}
export default MovieForm;