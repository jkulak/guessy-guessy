# guessy-guessy

The code comes with a simple, static Node.js server - so you can deploy it right away or run it locally. Also, since it is only a HTML + JS + CSS project - you sholud be able to double click the index.html file and see the working version in your browser.

## tl;dr

1.  Have Docker 🐳 installed on your system
2.  `git clone https://github.com/jkulak/guessy-guessy`
3.  `cd guessy-guessy`
4.  `./dev.sh` (build the Docker image, run the container and login)
5.  `npm install` (inside the container, to install dependencies in the mounted directory)
6.  `npm start` (optional, to run the server, and open: <http://localhost:8033>)

If you don't have Docker, just clone the repository and double click the `src/index.html` file to run the game in your browser.

## Development environment

The only dependency on your system is Docker 🐳. All tools (node, npm, gulp, babel, pm2), are installed locally inside the container. Login to the container to use all the tools.

### Development environment tools

-   `npm start` - will run `start` command from `package.json` that runs `pm2 start --no-daemon process.json` and will watch `./src` for changes and reload the server when needed

### Manually build and run the container

1.  Build the image from the Dockerfile `docker build -t jkulak/guessy-server .`
2.  Enter the dev mode `docker run --rm -ti -v $(pwd):/app jkulak/guessy-server sh -l` - this command will:
    -   create and run a container from the jkulak/guessy-guessy image
    -   will give the container a random name (no `--name` specified)
    -   mount your current directory as `/app` inside the container `-v`
    -   run the sh shell `sh`, and allow you to interact with it `-ti`
    -   `-l` is needed so that aliases defined in the Dockerfile are available

Run `docker exec -ti guessy-server sh -l` to login to an existing container (in case you want to work in more than one terminal window).

## Questions

*Q: Why use Node.js to serve static files?*

A: From performance perspective it would make sense to use Nginx, yes. Since it is a tiny game, and we already have Node.js installed (for the dev tools we use) - I though it would make things way more simple.
