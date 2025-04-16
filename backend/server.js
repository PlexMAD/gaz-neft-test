const express = require("express");
const cors = require("cors");

const server = express();
const port = 23456;

process.env.BASEDIR = process.cwd();


server.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

server.use("/api", require("./routes"));

server.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});
