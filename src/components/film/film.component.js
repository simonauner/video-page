import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    fetchFilmBeginAction,
    fetchFilmSuccessAction,
    fetchFilmFailureAction,
} from './film.actions';

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

    render() {
        const back = <Link to="/films">Back to all films</Link>;
        const { loading, film, error } = this.props;
        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return (
                <div>
                    {back}
                    <div>Failed to fetch film.</div>
                </div>
            );
        }

        if (!film || !film.title) {
            return back;
        }

        return (
            <div>
                {back}
                <div>Here is a film {film.title}</div>
            </div>
        );
    }
}

Film.propTypes = {
    film: PropTypes.object,
    getFilm: PropTypes.func,
    match: PropTypes.object,
    loading: PropTypes.bool,
};

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
