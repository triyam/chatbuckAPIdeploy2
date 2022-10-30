const chatCDK = require("./chatCDK");
const chatAPI = require("./chatAPI");
const connection = require("./connection");
const conversations = require("./conversations");
const messages = require("./messages");
module.exports = (app) => {
  app.use("/chatCDK", chatCDK);
  app.use("/chatAPI", chatAPI);
  app.use("/chatAPI", chatAPI);
  app.use("/connection", connection);
  app.use("/conversations", conversations);
  app.use("/messages", messages);
  // etc..
};
