import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import API from "../api-service";
import { useCookies } from "react-cookie";

function MovieDetails(props){

    const [token] = useCookies(['user-token']);

    const [highlighted, setHighlighted] = useState(-1);

    let mov = props.movie;

    const highlightRate = high => evt => {
        setHighlighted(high);
    }

    const rateClicked = (rate) => evt => {
        API.rateClicked(rate, mov.id, token['user-token'])
            .then(() => getDetails())
    }

    const getDetails = () => {
        API.getDetails(mov.id, token['user-token'])
            .then( resp => props.updateMovie(resp))

    }


    return(
        <React.Fragment>
            { mov ? (
              <div>
                    <h1>{mov && mov.title}</h1>
                    <p>{mov && mov.description}</p>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 0 ? 'yellow':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 1 ? 'yellow':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 2 ? 'yellow':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 3 ? 'yellow':''}/>
                    <FontAwesomeIcon icon={faStar} className={mov.avg_rating > 4 ? 'yellow':''}/>
                    ({mov.no_of_ratings})

                    <div className={"rate-container"}>
                            <h4>Rate it</h4>
                        { [...Array(5)].map( (e, i) => {
                            return <FontAwesomeIcon key={i} icon={faStar} className={highlighted > i - 1 ? 'purple':''}
                                    onMouseEnter={highlightRate(i)}
                                    onMouseLeave={highlightRate(-1)}
                                    onClick={rateClicked(i, mov.id)}
                            />
                        })}
                    </div>

              </div>

            ) : null}

        </React.Fragment>
    )
}

export default MovieDetails;