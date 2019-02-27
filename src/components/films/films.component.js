import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function getFilm(filmId) {
    return function(dispatch) {
        fetch(`/api/content/${filmId}`)
            .then(res => res.json())
            .then(res => {
                dispatch({ type: 'STORE_FILM', data: res });
            });
    };
}

class Films extends Component {
    render() {
        const films = ['i-feel-pretty-2018', 'ant-man-and-the-wasp-2018'];
        return (
            <div>
                <ul>
                    {films.map(film => {
                        const route = `films/${film}`;
                        return (
                            <li key={film}>
                                <Link to={route}>{film}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

Films.propTypes = {
    onFilmLinkClick: PropTypes.func,
};

const mapDispatchToProps = dispatch => {
    return {
        onFilmLinkClick: id => {
            return dispatch(getFilm(id));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Films);
