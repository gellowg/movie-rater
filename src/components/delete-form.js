import React from 'react';
import API from '../api-service'
import { useCookies } from "react-cookie";


function DeleteForm(props) {

    const [token] = useCookies(['user-token']);

    const deleteClicked = () => {
        API.deleteMovie(props.movie.id, token['user-token'])
            .then(props.removeClicked(props.movie))
        props.clearMovie()
    }

    return (
        <React.Fragment>
            { props.movie ? (
                <div className={'deleteForm'}>
                    <label htmlFor={'question'} >Do you want to delete {props.movie.title}?</label> <br/>

                    <button onClick={deleteClicked}>Yes</button>
                </div>
            ): null }
        </React.Fragment>

    )
}
export default DeleteForm;