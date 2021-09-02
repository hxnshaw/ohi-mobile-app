const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mobile-application-api", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});
