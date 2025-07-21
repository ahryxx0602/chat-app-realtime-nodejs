# Realtime Chat App 🚀

Ứng dụng chat realtime sử dụng Node.js, Express, Socket.IO, MongoDB, EJS, Bootstrap. Hỗ trợ đăng ký, đăng nhập, xác thực JWT, chat nhiều người, gửi ảnh, emoji, avatar ngẫu nhiên.

## Tính năng nổi bật

- Đăng ký, đăng nhập, xác thực bằng JWT
- Giao diện hiện đại, responsive, sử dụng Bootstrap & FontAwesome
- Chat realtime nhiều người với Socket.IO
- Gửi tin nhắn, emoji, ảnh (base64 hoặc URL)
- Avatar ngẫu nhiên cho mỗi user
- Thông báo lỗi đẹp, UX thân thiện

## Cài đặt & chạy local

1. **Clone repo:**
   ```bash
   git clone https://github.com/ahryxx0602/chat-app-realtime-nodejs.git
   cd chat-app-realtime-nodejs
   ```
2. **Cài dependencies:**
   ```bash
   npm install
   ```
3. **Tạo file .env:**
   ```env
   MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```
4. **Chạy ứng dụng:**
   ```bash
   npm start
   ```
5. **Truy cập:**
   - Mở trình duyệt: [http://localhost:3000/login](http://localhost:3000/login)

## Deploy miễn phí với Railway

1. Đẩy code lên GitHub.
2. Đăng ký [Railway.app](https://railway.app/), tạo project mới, kết nối repo.
3. Thêm service MongoDB (hoặc dùng MongoDB Atlas).
4. Thêm biến môi trường `MONGODB_URI`, `JWT_SECRET`, `PORT`.
5. Railway sẽ tự động build và deploy, cung cấp link public.

## Cấu trúc thư mục

```
realtime-chat/
  ├── src/
  │   ├── app.js, server.js         # Khởi tạo app, server
  │   ├── config/db.js              # Kết nối MongoDB
  │   ├── controllers/              # Xử lý logic đăng nhập, chat
  │   ├── middlewares/              # Middleware xác thực
  │   ├── models/                   # Schema User, Message
  │   ├── public/                   # Static files (css, js)
  │   ├── routes/                   # Định nghĩa route
  │   ├── services/                 # Xử lý nghiệp vụ
  │   ├── socket/                   # Xử lý Socket.IO
  │   ├── utils/                    # JWT utils
  │   └── views/                    # Giao diện EJS
  ├── .env.example                  # Mẫu biến môi trường
  ├── .gitignore
  └── README.md
```

## Đóng góp & liên hệ

- Pull request, issue, góp ý đều được hoan nghênh!
- Liên hệ:
  - [GitHub: ahryxx0602](https://github.com/ahryxx0602)
  - [Facebook: Phan Văn Thành](https://www.facebook.com/vanthanh.phan.75286/)

---

**Chúc bạn chat vui vẻ và học tốt NodeJS!**
