import React from 'react';
import PropTypes from 'prop-types';
import { CardContent } from '../generic';
import EditButton from './EditButton';

const MovieCardContent = props => {
    const {
        title,
        poster,
        runtime,
        year,
        genre,
        openModal,
    } = props;
    const style = {
        backgroundImage: `url(${poster})`,
    };

    const details = <div className="movie-card-content-details">
        {runtime}
        &nbsp;
        &#8226;
        &nbsp;
        {year}
        &nbsp;
        &#8226;
        &nbsp;
        {genre}
    </div>;
    return (<CardContent 
        className="movie-card-content"
        style={style}
    >
        <div className="movie-card-content-info">
            <div>
                <h5 className="movie-card-content-title">{title}</h5>
                {details}
            </div>
            <EditButton onClick={openModal} />
        </div>
    </CardContent>);
}

export default MovieCardContent;