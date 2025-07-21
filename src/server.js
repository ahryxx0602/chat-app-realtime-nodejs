require("dotenv").config();
const http = require("http"); // Tạo server HTTP thuần
const app = require("./app");
const socketHandler = require("./socket");

const server = http.createServer(app); // Tạo server từ Express app

const io = require("socket.io")(server, {
  cors: { origin: "*" }, // Cho phép socket kết nối từ các domain khác
});

socketHandler(io); // Đưa io vào xử lý ở file socket.js

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
