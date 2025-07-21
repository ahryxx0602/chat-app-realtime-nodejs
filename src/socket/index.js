const Message = require("../models/Message");
const jwt = require("jsonwebtoken");

module.exports = (io) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.user.username}`);

    //Gửi lịch sử tin nhắn cho người dùng mới
    const history = await Message.find().sort({ createdAt: 1 }).limit(100);
    socket.emit("chatHistory", history);

    // Khi người dùng gửi tin nhắn
    socket.on("sendMessage", async (data) => {
      const msg = await Message.create({
        sender: socket.user.username,
        content: data,
      });
      io.emit("newMessage", msg);
    });

    // Gửi hình ảnh (base64 hoặc URL sticker)
    socket.on("sendImage", async (base64Image) => {
      try {
        // Giới hạn dung lượng ảnh base64 (ví dụ < 1MB)
        const maxSize = 1 * 1024 * 1024; // 1MB
        const sizeInBytes = Buffer.byteLength(base64Image, "base64");

        if (sizeInBytes > maxSize) {
          socket.emit(
            "errorMessage",
            "Ảnh vượt quá kích thước cho phép (tối đa 1MB)"
          );
          return;
        }

        const msg = await Message.create({
          sender: socket.user.username,
          content: base64Image, // base64 hoặc URL sticker
        });

        io.emit("newMessage", msg);
      } catch (err) {
        console.error("Lỗi gửi ảnh:", err);
        socket.emit("errorMessage", "Gửi ảnh thất bại");
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.user.username}`);
    });
  });
};
