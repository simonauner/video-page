import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Films extends Component {
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
