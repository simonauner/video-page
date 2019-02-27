import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { TopMenu } from '../top-menu/top-menu.component';
import routes from '../../routes';

export class App extends Component {
    render() {
        return (
            <div>
                <TopMenu />
                <Switch>
                    {routes.map(route => (
                        <Route key={route.path} {...route} />
                    ))}
                </Switch>
            </div>
        );
    }
}
