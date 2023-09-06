const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const usersRouter = require("./routes/users/usersRouter");
const connectDB = require("./config/database");
const {
  notFound,
  globalErrHandler,
} = require("./middlewares/globalErrorHandler");
const categoryRouter = require("./routes/category/categoryRouter");
const postRouter = require("./routes/post/postRouter");
const commentRouter = require("./routes/comment/commentRouter");
connectDB();

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/comments", commentRouter);

const server = http.createServer(app);

app.use(notFound);

app.use(globalErrHandler);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
