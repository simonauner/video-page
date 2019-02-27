import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFilm } from './film.actions';

class Film extends Component {
    componentDidMount() {
        this.props.getFilm(this.props.match.params.filmId);
    }

    render() {
        const back = <Link to="/films">Back to all films</Link>;
        const { loading, film } = this.props;
        if (loading) {
            return <div>Loading...</div>;
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getFilm: id => {
            return dispatch(getFilm(id));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Film);
