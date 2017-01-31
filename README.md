# guessy-guessy

The code comes with a simple, static Node.js server - so you can deploy it right away or run it locally. Also, since it is only a HTML + JS + CSS project - you sholud be able run it by double clicking the `src/index.html` file after compiling the `src/sass/main.scss` file to `src/style/main.css`.

## tl;dr

1.  Have Docker 🐳 installed on your system, and then in your terminal:
2.  `git clone https://github.com/jkulak/guessy-guessy`
3.  `cd guessy-guessy`
4.  `./dev.sh` (build the Docker image, run the container and login)
5.  `npm install` (inside the container, to install dependencies in the mounted directory)
6.  `pm2 start --no-daemon process.json` (optional, to run the server, and open: <http://localhost:8033>)

## Development environment

The only dependency on your system is Docker 🐳. All tools (node, npm, gulp, babel, pm2), are installed locally inside the container. Login to the container to use all the tools.

### Development tools

-   `pm2 start --no-daemon process.json` - will start the server and watch `./src` for changes and reload the server when needed
-   `gulp build-for-production` - will build your source for production (compile sass files, autoprefixer css properties, concatenate css files, generate source map files, transpile ES6 to ES5) and put it in `build/` directory
-   `gulp watch` - rebuild your css, js files when changed

### Manually build and run the container

1.  Build the image from the Dockerfile `docker build -t jkulak/guessy-server .`
2.  Enter the dev mode `docker run --rm -ti -v $(pwd):/app jkulak/guessy-server sh -l` - this command will:
    -   create and run a container from the jkulak/guessy-guessy image
    -   will give the container a random name (no `--name` specified)
    -   mount your current directory as `/app` inside the container `-v`
    -   run the sh shell `sh`, and allow you to interact with it `-ti`
    -   `-l` is needed so that aliases defined in the Dockerfile are available

Run `docker exec -ti guessy-server sh -l` to login to an existing container (in case you want to work in more than one terminal window).

## Development

Depending on the server mode (`development` or `production`) it will serve files from `src/` or `build/` dirctory.

1.  After running the container, run the server in development mode (using `pm2` process manager) `./node_modules/.bin/pm2 start --no-daemon process.json` - console will start printing server logs
2.  Login to the container in another windows `docker exec -ti guessy-server sh -l`
3.  Start watching files for changes with gulp for improved development experience `gulp watch`

Gulp will start a [livereload](https://www.npmjs.com/package/gulp-livereload) server that will reload the website when you change the files. To use that functionality, container exposes port `35729` (default livereload's port) and you need to install a [livereload browser plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en).

## Questions

*Q: Why use Node.js to serve static files?*

A: From performance perspective it would make sense to use Nginx, yes. Since it is a tiny game, and we already have Node.js installed (for the dev tools we use) - I though it would make things way more simple.
