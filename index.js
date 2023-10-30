require("dotenv").config();
const app = require("./app/app");
const http = require("http");
const connectDB = require("./DB/connectionDB");

const PORT = process.env.PORT || 3030;
const server = http.createServer(app);

const start = async () => {
  try {
    await connectDB();
  } catch (e) {
    console.log("Database Error");
    console.log(e);
  }
};

start();
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
