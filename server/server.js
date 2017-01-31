'use strict';

// This simple static server was build following the tutorial at:
// http://adrianmejia.com/blog/2016/08/24/Building-a-Node-js-static-file-server-files-over-HTTP-using-ES6/

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const root_dir = (process.env.NODE_ENV === 'production') ? 'build/' : 'src/';

// You can pass the parameter in the command line. e.g. node static_server.js 3000
const port = process.argv[2] || 8033;
http.createServer(function (req, res) {

    console.log(`${req.method} ${req.url}`);
    const parsedUrl = url.parse(req.url);
    let pathname = `${root_dir}/${parsedUrl.pathname}`;

    const mimeType = {
        '.ico': 'image/x-icon',
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.json': 'application/json',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.ttf': 'aplication/font-sfnt'
    };

    fs.exists(pathname, function (exist) {

        if (!exist) {
            res.statusCode = 404;
            res.end(`File ${pathname} not found!`);
            return;
        }

        // If is a directory, then look for index.html
        if (fs.statSync(pathname).isDirectory()) {
            pathname += '/index.html';
        }

        // Read file from file system
        fs.readFile(pathname, function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end(`Error getting the file: ${err}.`);
            } else {

                // Based on the URL path, extract the file extention. e.g. .js, .doc, ...
                const ext = path.parse(pathname).ext;

                // If the file is found, set Content-type and send data
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);
