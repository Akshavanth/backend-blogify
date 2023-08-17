const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
connectDB();

const app = express();

app.use(express.json());
app.use("/api/v1/users", usersRouter);

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
