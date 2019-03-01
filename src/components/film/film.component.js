import React, { Component } from 'react';
import { connect } from 'preact-redux';
import { Link } from 'react-router-dom';
import {
    fetchFilmBeginAction,
    fetchFilmSuccessAction,
    fetchFilmFailureAction,
} from './film.actions';

import Trailer from '../trailer/trailer.component';

class Film extends Component {
    componentDidMount() {
        this.props.fetchFilmBeginAction();
        fetch(`/api/content/${this.props.match.params.filmId}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error('fetch fail');
            })
            .then(res => {
                return this.props.fetchFilmSuccessAction(res);
            })
            .catch(error => {
                this.props.fetchFilmFailureAction(error);
            });
    }

    formatFilmContent() {
        const { film } = this.props;
        let tags = [];

        if (!film) {
            return null;
        }

        if (film.system.flags.some(flag => flag === 'availableInHd')) {
            tags.push('HD');
        }

        if (film.content.parentalRating === '15') {
            tags.push('15');
        }

        return (
            <div content-grid="" pam-grid="">
                <div pam-unit="1-1 medium:1-2">
                    <Trailer
                        image={film.content.images.landscape.url}
                        trailerUrl={film.trailer}
                    />
                </div>
                <div pam-unit="1-1 medium:1-2" content="">
                    <div pam-typography="display-2">{film.content.title}</div>
                    <div pam-typography="headline">
                        {film._links['viaplay:genres']
                            .map(genreObj => genreObj.title)
                            .join('/')}
                        <span pam-skin="text:secondary"> | </span>
                        {film.content.production.year}
                        <span pam-skin="text:secondary"> | </span>
                        {film.content.duration.readable}
                    </div>
                    <div imdb="">
                        <a href={film.content.imdb.url}>
                            <img
                                width="30"
                                src="https://ia.media-imdb.com/images/M/MV5BMTk3ODA4Mjc0NF5BMl5BcG5nXkFtZTgwNDc1MzQ2OTE@._V1_.png"
                            />
                        </a>
                        &nbsp;
                        <span pam-typography="title">
                            {film.content.imdb.rating}
                        </span>{' '}
                        <span pam-typography="body-1" pam-skin="text:secondary">
                            from {film.content.imdb.votes} users
                        </span>
                    </div>
                    <div pam-typography="body-1">{film.content.synopsis}</div>
                    <div people-and-country="">
                        <div pam-typography="body-1">
                            <strong>Actors: </strong>
                            {film.content.people.actors
                                .map(actor => (
                                    <span key={actor}>
                                        <Link pam-link="" to="/people">
                                            {actor}
                                        </Link>
                                    </span>
                                ))
                                .reduce((acc, curr) => [acc, ', ', curr])}
                        </div>
                        <div pam-typography="body-1">
                            <strong>Director: </strong>
                            {film.content.people.directors
                                .map(actor => (
                                    <span key={actor}>
                                        <Link pam-link="" to="/people">
                                            {actor}
                                        </Link>
                                    </span>
                                ))
                                .reduce((acc, curr) => [acc, ', ', curr])}
                        </div>
                        <div pam-typography="body-1">
                            <strong>Country: </strong>
                            {film.content.production.country}
                        </div>
                    </div>
                    <div pam-typography="body">
                        {tags
                            .map(tag => (
                                <span key={tag} pam-tag="">
                                    {tag}
                                </span>
                            ))
                            .reduce((acc, curr) => [acc, ' ', curr])}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const back = (
            <Link pam-link="" to="/films">
                Back to all films
            </Link>
        );
        const { loading, error } = this.props;

        function r(content) {
            return (
                <div film-container="">
                    {back}
                    <div>{content}</div>
                </div>
            );
        }

        if (loading) {
            const styles = {
                margin: '24px 50%',
            };
            return r(<div style={styles} pam-loader="circle" />);
        }

        if (error) {
            return r(<div>Failed to fetch film.</div>);
        }

        return r(this.formatFilmContent());
    }
}

const mapStateToProps = state => {
    return {
        film: state.film.filmData,
        loading: state.film.loading,
        error: state.film.error,
    };
};

const mapDispatchToProps = {
    fetchFilmBeginAction: fetchFilmBeginAction,
    fetchFilmSuccessAction: fetchFilmSuccessAction,
    fetchFilmFailureAction: fetchFilmFailureAction,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Film);
