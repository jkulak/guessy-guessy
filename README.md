# guessy-guessy

The code comes with a simple, static Node.js server - so you can deploy it right away or run it locally. Since it is a HTML + JS + CSS project - you sholud be able to double click the index.html file and see the workign version in your browser.

## Development

The only dependency on your system is Docker 🐳. All tools (node, npm, gulp, babel, pm2), are installed locally inside the container. Login to the container to use all the tools.

### tl;dr  

1.  Run provided `./dev.sh` script to build the image and run the container
2.  Run `npm install` after being logged in

*Disclaimer:* `npm install` is performed when the image is being built (see inside the `Dockerfile`) and it's necessary to run the application from the container. But! When running the container for development purposes, we mount our directory inside the container - therefore overwriting the original content (so there is no `node_modules` anymore).

### Manually build and run the container

1.  Build the image from the Dockerfile `docker build -t jkulak/guessy-server .`
2.  Enter the dev mode `docker run --rm -ti -v $(pwd):/app jkulak/guessy-server sh -l` - this command will:
    -   create and run a container from the jkulak/guessy-guessy image
    -   will give the container a random name (no `--name` specified)
    -   mount your current directory as `/app` inside the container `-v`
    -   run the sh shell `sh`, and allow you to interact with it `-ti`
    -   `-l` is needed so that aliases defined in the Dockerfile are available

## Questions

*Q: Why use Node.js to serve static files?*

A: From performance perspective it would make sense to use Nginx, yes. Since it is a tiny game, and we already have Node.js installed (for the dev tools we use) - I though it would make things way more simple.
