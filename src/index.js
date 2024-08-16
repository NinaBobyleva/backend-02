const http = require("http");
const getUsers = require("./modules/users");

const port = 3003;
const hostName = "http://127.0.0.1";

const server = http.createServer((request, response) => {
  const url = new URL(request.url, hostName);
  const userName = url.searchParams.get("hello");

  if (userName) {
    response.status = 200;
    response.statusMessage = "ok";
    response.setHeader("Content-Type", "text/plain");
    response.write(`Hello, my friend ${userName}`);
    response.end();
    return;
  }
  
  switch (request.url) {
    case "/":
      response.status = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-type", "text/plain");
      response.write("Hello, world!");
      response.end();

      break;

    case "/?users":
      response.statusCode = 200;
      response.statusMessage = "OK";
      response.setHeader("Content-type", "application/json");
      response.write(getUsers());
      response.end();

      break;

    case "/?hello":
      response.statusCode = 400;
      response.statusMessage = "Bad Request";
      response.setHeader("Content-type", "text/plain");
      response.write("Enter a name");
      response.end();

      break;

    default:
      response.statusCode = 500;
      response.statusMessage = "Internal Server Error";
      response.setHeader("Content-type", "text/plain");
      response.write("Сервер не доступен!");
      response.end();

      break;
  }
});

server.listen(port, () => {
  console.log(`Сервер запущен по адресу ${hostName}:${port}`);
});
