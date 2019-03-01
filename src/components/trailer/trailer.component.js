import React, { Component } from 'react';

const playIcon =
    '<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M371.7 238l-176-107c-15.8-8.8-35.7 2.5-35.7 21v208c0 18.4 19.8 29.8 35.7 21l176-101c16.4-9.1 16.4-32.8 0-42zM504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256z"></path></svg>';

export default class Trailer extends Component {
    constructor(props) {
        super(props);
        this.loadTrailer = this.loadTrailer.bind(this);

        this.state = {};
    }

    loadTrailer() {
        // console.log('load trailer...');
        this.setState({
            showTrailer: true,
        });
    }

    render() {
        const svgObj = {
            __html: playIcon,
        };
        const containerStyle = {
            width: '100%',
            height: '360px',
            maxWidth: '768px',
        };

        const imageStyle = {
            backgroundImage: `url(${this.props.image})`,
        };

        const content = this.state.showTrailer ? (
            <iframe
                type="text/html"
                width="100%"
                height="360"
                src={this.props.trailerUrl}
                frameBorder="0"
            />
        ) : (
            <div
                placeholder=""
                onClick={this.loadTrailer}
                style={imageStyle}
                dangerouslySetInnerHTML={svgObj}
            />
        );
        return (
            <div trailer="" style={containerStyle}>
                {content}
            </div>
        );
    }
}
