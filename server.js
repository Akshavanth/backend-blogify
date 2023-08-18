const http = require("http");
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
connectDB();

const app = express();

app.use(express.json());
app.use("/api/v1/users", usersRouter);

app.use((err, req, res, next) => {
  const status = err?.status ? err?.status : "Failed";
  const message = err?.message;
  const stack = err?.stack;

  res.status(500).json({
    status,
    message,
    stack,
  });
});

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
