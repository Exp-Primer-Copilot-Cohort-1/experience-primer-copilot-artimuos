// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. The comments.html file will have a form that allows users to submit comments. When a user submits a comment, the server should append the comment to the comments.txt file. The server should also serve the comments.txt file so that users can see all the comments that have been submitted. Use the fs module to read and write to the comments.txt file. Do not use Express.

const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.url === '/comments.html' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'comments.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading comments.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.url === '/comments.txt' && req.method === 'GET') {
    fs.readFile(path.join(__dirname, 'comments.txt'), (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading comments.txt');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(data);
      }
    });
  } else if (req.url === '/comments.txt' && req.method === 'POST') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      fs.appendFile(path.join(__dirname, 'comments.txt'), body + '\n', (err) => {
        if (err) {
          res.writeHead(500);
          res.end('Error writing to comments.txt');
        } else {
          res.writeHead(200);
          res.end('Comment added');
        }
      });
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// comments.html
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Comments</title>
// </head>
// <