import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { Film } from '../film/film.component';
import { Home } from '../home/home.component';

export class App extends Component {
    render() {
        return (
            <div>
                <div>Hello world!</div>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/film">Film</Link>
                    </li>
                </ul>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/film" exact component={Film} />
                </Switch>
            </div>
        );
    }
}
