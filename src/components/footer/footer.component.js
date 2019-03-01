import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Footer extends Component {
    render() {
        return (
            <div footer dark-container="">
                <div pam-grid="" pam-grid-control="wrap:wrap">
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">LOGO</h2>
                    </div>
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">Headline</h2>
                        <ul>
                            <li>
                                <Link pam-link="" to="/series">
                                    Series
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Film
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Kids
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Rental
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">About us</h2>
                        <ul>
                            <li>
                                <Link pam-link="" to="/series">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Jobs
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">Information</h2>
                        <ul>
                            <li>
                                <Link pam-link="" to="/series">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Our platforms
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    System reqs
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Terms and conditions
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Privacy policy
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Cookies
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">Social</h2>
                        <ul>
                            <li>
                                <Link pam-link="" to="/series">
                                    Facebook
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Twitter
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Linkedin
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div pam-unit="1-3 medium:4-24">
                        <h2 pam-typography="subheading">TV</h2>
                        <ul>
                            <li>
                                <Link pam-link="" to="/series">
                                    TV 1
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    TV 2
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    TV 3
                                </Link>
                            </li>
                            <li>
                                <Link pam-link="" to="/series">
                                    TV 4
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
