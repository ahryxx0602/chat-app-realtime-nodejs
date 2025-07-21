const Message = require("../models/Message");

exports.getMessages = async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
};
