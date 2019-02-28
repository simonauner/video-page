import React, { Component } from 'react';

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
        const containerStyle = {
            width: '100%',
            height: '360px',
            maxWidth: '768px',
        };

        const imageStyle = {
            width: '100%',
            height: '100%',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            backgroundImage: `url(${this.props.image})`,
            cursor: 'pointer',
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
            <div onClick={this.loadTrailer} style={imageStyle} />
        );
        return <div style={containerStyle}>{content}</div>;
    }
}
