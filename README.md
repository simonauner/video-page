# video-page

## About

This is a ~~React~~ Preact app that uses express as the server application. It uses parcel to bundle the frontend code. Is uses [PAM CSS](https://mrgreentech.github.io/pam/) to leverage [AMCSS](https://amcss.github.io/) principles about CSS scalable and maintainable styling. The server also hosts an API.

## Getting started

`npm install`

## Development environment

Open up two terminals, in one you run the frontend watch function with parcel, in the other you run the node server.

1. `npm run dev`
2. `npm run dev:server`

## Production build

1. `npm run build`
2. `npm start`

## Tests

`npm test`

To watch:

`npm test -- --watch`

## API benchmark

Without cache:

```
curl -s -w '%{time_total}\n' http://localhost:8080/api/content/i-feel-pretty-2018 --output /dev/null
5 runs: 1.044033 0.977057 1.123744 1.124408 1.088309
Average: 1.0715102
```

With cache:

```
curl -s -w '%{time_total}\n' http://localhost:8080/api/content/i-feel-pretty-2018 --output /dev/null
5 runs: 1.056212 0.007648 0.007152 0.005811 0.006565
Average: 0.21 (with cold cache)
```

## Using preact

Using react is cool, but for such a small app I wanted to see if it would be possible to switch to Preact for a smaller JS footprint.

Bundle size with React:

```
> parcel build ./src/client.js ./src/app.scss

✨  Built in 5.23s.

dist/client.js     223.42 KB    4.96s
dist/app.css           605 B    2.21s
```

Serving it gzipped takes it down to 60.6 KB.

Switching to preact and preact-redux:

```
> parcel build ./src/client.js ./src/app.scss

✨  Built in 4.01s.

dist/client.js     119.77 KB    3.74s
dist/app.css           605 B    2.86s
```

Serving it gzipped is 29.8 KB, so around 50% bundle size saved!

## Things left to do

... that I leave unconsidered for now:

-   Rate limiting on the Movie DB API
-   Sending cache headers to the client
-   Testing in additional browsers. Only Safari and Chrome OSX is tested.

## Licenses

-   Icon font is from https://fontawesome.com/ and is used with the [Creative Commons Attribution 4.0 International license](https://fontawesome.com/license).
