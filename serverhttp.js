// to use the default module http:
const http = require("http");

// set port:
const port = 3000;

// create routes:
const routes = {
  "/": "Nodejs Course",
  "/books": "books page",
  "/authors": "authors page",
  "/publisher": "publisher page",
  "/other": "other page",
  "/about": "about page",
};

// create local server:
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.end(routes[req.url]);
});

// link server+port:
server.listen(port, () => {
  console.log(`server runing on http://localhost:${port}`);
});
