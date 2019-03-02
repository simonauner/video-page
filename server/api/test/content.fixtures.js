export const validContentResponse = {
    _embedded: {
        'viaplay:blocks': [
            {
                _embedded: {
                    'viaplay:product': {
                        type: 'movie',
                        publicPath: 'i-feel-pretty-2018',
                        content: {
                            duration: {
                                milliseconds: 6320544,
                                readable: '1h 45min',
                            },

                            imdb: {
                                id: 'tt6791096',
                                rating: '5.4',
                                votes: '35 200',
                                url:
                                    'http://www.imdb.com/title/tt6791096?ref_ext_viaplay',
                            },
                            synopsis:
                                'Renee kämpar med att övervinna sin osäkerhet och känslan av att inte duga. En dag ramlar hon, slår i huvudet och vaknar upp med övertygelsen om att hon är oemotståndlig. Plötsligt är livet underbart.',
                            title: 'I Feel Pretty',
                        },
                    },
                },
            },
        ],
    },
};

export const validContentResponseInvalidImdbId = {
    _embedded: {
        'viaplay:blocks': [
            {
                _embedded: {
                    'viaplay:product': {
                        type: 'movie',
                        publicPath: 'i-feel-pretty-2018',
                        content: {
                            duration: {
                                milliseconds: 6320544,
                                readable: '1h 45min',
                            },

                            imdb: {
                                id: 'banan',
                                rating: '5.4',
                                votes: '35 200',
                                url:
                                    'http://www.imdb.com/title/tt6791096?ref_ext_viaplay',
                            },
                            synopsis:
                                'Renee kämpar med att övervinna sin osäkerhet och känslan av att inte duga. En dag ramlar hon, slår i huvudet och vaknar upp med övertygelsen om att hon är oemotståndlig. Plötsligt är livet underbart.',
                            title: 'I Feel Pretty',
                        },
                    },
                },
            },
        ],
    },
};

export const validFindResponse = {
    movie_results: [
        {
            id: 'hajen',
        },
    ],
};

export const validVideosResponse = {
    results: [
        {
            site: 'Youtube',
            type: 'Trailer',
            key: 'abc',
        },
    ],
};
