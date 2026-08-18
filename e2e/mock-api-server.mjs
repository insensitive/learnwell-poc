import http from "node:http";

const server = http.createServer((request, response) => {
  if (request.url?.startsWith("/api/videos")) {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ videos: [] }));
    return;
  }

  response.writeHead(404);
  response.end();
});

server.listen(4000, "127.0.0.1");
