# guessy-guessy

The code comes with a simple, static Node.js server - so you can deploy it right away or run it locally. Since it is a HTML + JS + CSS project - you sholud be able to double click the index.html file and see the workign version in your browser.

## Development

1.  Build the image from the Dockerfile `docker build -t jkulak/guessy-guessy .`
2.  Enter the dev mode `docker run --rm -ti -v $(pwd):/app jkulak/guessy-guessy sh -l` - this command will:
    1.  create and run a container from the jkulak/guessy-guessy image
    2.  will give the container a random name (no `--name` specified)
    3.  mount your current directory as `/app` inside the container `-v`
    4.  run the sh shell `sh`, and allow you to interact with it `-ti`
    5.  `-l` is needed so that aliases defined in the Dockerfile are available
