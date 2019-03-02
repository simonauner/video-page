import { startServer, stopServer } from '../../server';
import nock from 'nock';
import request from 'request-promise-native';

import {
    validContentResponse,
    validContentResponseInvalidImdbId,
    validFindResponse,
    validVideosResponse,
} from './content.fixtures';

nock.disableNetConnect();
nock.enableNetConnect('127.0.0.1');
nock.enableNetConnect('localhost');

describe('/content', () => {
    afterEach(function() {
        if (!nock.isDone()) {
            this.test.error(new Error('Not all nock interceptors were used!'));
        }
        nock.cleanAll();
    });
    beforeAll(done => startServer(done));
    afterAll(done => stopServer(done));

    describe('error handling', () => {
        it('should return the same status code as external content API', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/fel')
                .reply(404);

            // act
            request('http://localhost:8080/api/content/fel').catch(err => {
                // assert
                expect(err.statusCode).toEqual(404);
                done();
            });
        });

        it('should return 200 even if no movies are found in movie db', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten')
                .reply(200, validContentResponseInvalidImdbId);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/banan')
                .query(true) // anything goes!
                .once()
                .reply(200, { movie_results: [] });

            // act
            request('http://localhost:8080/api/content/jultomten', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(res => {
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(JSON.parse(res.body)).not.toHaveProperty('trailer');

                    done();
                })
                .catch(done);
        });

        it('should return 200 even if no trailers are found in movie db', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten456')
                .reply(200, validContentResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/tt6791096')
                .query(true) // anything goes!
                .reply(200, validFindResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/movie/hajen/videos')
                .query(true) // anything goes!
                .reply(200, { results: [] });

            // act
            request('http://localhost:8080/api/content/jultomten456', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(res => {
                    const body = JSON.parse(res.body);
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(body).not.toHaveProperty('trailer');
                    done();
                })
                .catch(done);
        });

        it('return 200 even if trailer is not from youtube', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten789')
                .reply(200, validContentResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/tt6791096')
                .query(true) // anything goes!
                .reply(200, validFindResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/movie/hajen/videos')
                .query(true) // anything goes!
                .reply(200, {
                    results: [
                        {
                            site: 'Netflix',
                            type: 'Trailer',
                            key: 'abc',
                        },
                    ],
                });

            // act
            request('http://localhost:8080/api/content/jultomten789', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(res => {
                    const body = JSON.parse(res.body);
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(body).not.toHaveProperty('trailer');
                    done();
                })
                .catch(done);
        });

        it('should return 200 even if video is not type trailer', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten0')
                .reply(200, validContentResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/tt6791096')
                .query(true) // anything goes!
                .reply(200, validFindResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/movie/hajen/videos')
                .query(true) // anything goes!
                .reply(200, {
                    results: [
                        {
                            site: 'Youtube',
                            type: 'something else',
                            key: 'abc',
                        },
                    ],
                });

            // act
            request('http://localhost:8080/api/content/jultomten0', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(res => {
                    const body = JSON.parse(res.body);
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(body).not.toHaveProperty('trailer');
                    done();
                })
                .catch(done);
        });
    });

    describe('cache', () => {
        it('should only go to the same external content URL once', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten000')
                .once()
                .reply(200, validContentResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/tt6791096')
                .query(true) // anything goes!
                .reply(200, validFindResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/movie/hajen/videos')
                .query(true) // anything goes!
                .reply(200, validVideosResponse);

            // act
            request('http://localhost:8080/api/content/jultomten000', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(() =>
                    request('http://localhost:8080/api/content/jultomten000', {
                        resolveWithFullResponse: true,
                    })
                )
                .then(res => {
                    const body = JSON.parse(res.body);
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(body).toHaveProperty('trailer');
                    done();
                })
                .catch(done);
        });
    });

    describe('success', () => {
        it('should return 200 when everything is ok', done => {
            // align
            nock('https://content.viaplay.se:443')
                .get('/pc-se/film/jultomten123')
                .reply(200, validContentResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/find/tt6791096')
                .query(true) // anything goes!
                .reply(200, validFindResponse);

            nock('https://api.themoviedb.org:443')
                .get('/3/movie/hajen/videos')
                .query(true) // anything goes!
                .reply(200, validVideosResponse);

            // act
            request('http://localhost:8080/api/content/jultomten123', {
                resolveWithFullResponse: true, // to get statusCode is res obj
            })
                .then(res => {
                    const body = JSON.parse(res.body);
                    // assert
                    expect(res.statusCode).toEqual(200);
                    expect(body).toHaveProperty('trailer');
                    done();
                })
                .catch(done);
        });
    });
});
