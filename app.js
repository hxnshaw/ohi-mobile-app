const express = require("express");
require("./db/mongoose");
const app = express();

//Router Files
app.use(express.json());
const users = require("./routers/users");
const posts = require("./routers/posts");

const PORT = 4444;

//Mount Routers
app.use("/api/v1/users", users);
app.use("/api/v1/posts", posts);

app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
