const HttpServer = require("./utils/http.server");
require('dotenv').config()



const PORT = process.env.PORT || 8080
const server = HttpServer.getInstance();

server.listen(PORT)