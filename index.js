require("dotenv").config();
const { createServer } = require("http");
const app = require("./app/app");
const PORT = process.env.PORT || 3030;
const server = createServer(app);
require("./DB/connectionDB");

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
