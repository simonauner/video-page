import React, { Component } from 'preact-compat';
import { Link } from 'react-router-dom';

export class TopMenu extends Component {
    render() {
        return (
            <div pam-grid="" dark-container="">
                <div pam-unit="4-5">
                    <div pam-menu="">
                        <ul pam-menu-list="">
                            <li pam-menu-item="">
                                <Link to="/" pam-menu-link="">
                                    Home
                                </Link>
                            </li>
                            <li pam-menu-item="">
                                <Link to="/films" pam-menu-link="">
                                    Films
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div pam-unit="1-5">
                    <div pam-menu="">
                        <ul pam-menu-list="">
                            <li
                                pam-menu-item=""
                                pam-menu-has-children=""
                                pam-menu-allow-hover=""
                            >
                                <a href="#" pam-menu-link="">
                                    John Doe
                                </a>
                                <ul pam-menu-children="">
                                    <li pam-menu-item="">
                                        <a pam-menu-link="" href="#">
                                            Node
                                        </a>
                                    </li>
                                    <li pam-menu-item="">
                                        <a pam-menu-link="" href="#">
                                            JavaScript
                                        </a>
                                    </li>
                                    <li pam-menu-item="">
                                        <a pam-menu-link="" href="#">
                                            Angular
                                        </a>
                                    </li>
                                    <li pam-menu-item="">
                                        <a pam-menu-link="" href="#">
                                            React
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
