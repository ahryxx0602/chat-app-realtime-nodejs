const socket = io("/", {
  auth: { token: window.token },
});

const input = document.getElementById("msg");
const messages = document.getElementById("messages");
const imageInput = document.getElementById("imageInput");

// Gửi tin nhắn text
function sendMessage() {
  const content = input.value;
  if (content.trim()) {
    socket.emit("sendMessage", content);
    input.value = "";
  }
}

// Gửi sticker
function sendSticker(url) {
  socket.emit("sendImage", url); // sticker là URL ảnh
}

// 📤 Gửi ảnh upload
imageInput.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  if (file.size > 1 * 1024 * 1024) {
    alert("Ảnh vượt quá 1MB!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    socket.emit("sendImage", e.target.result); // gửi base64 ảnh
  };
  reader.readAsDataURL(file);
});

function toggleEmojiPicker() {
  const picker = document.getElementById("emojiPicker");
  picker.style.display = picker.style.display === "none" ? "block" : "none";
}

// Bắt sự kiện chọn emoji và thêm vào input
document
  .getElementById("emojiPicker")
  .addEventListener("emoji-click", (event) => {
    const emoji = event.detail.unicode;
    const input = document.getElementById("msg");
    input.value += emoji;
    input.focus();
  });

// Lắng nghe phím Enter để gửi
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
});

//  Nhận tin nhắn mới hoặc lịch sử
socket.on("chatHistory", (history) => {
  history.forEach((msg) => renderMessage(msg));
});

socket.on("newMessage", (msg) => {
  renderMessage(msg);
});

//  Hiển thị tin nhắn (text / emoji / ảnh / sticker)
function renderMessage(msg) {
  const item = document.createElement("div");
  const isMe = msg.sender === window.username;
  // Tin nhắn của mình (.self) sẽ nằm bên phải
  item.className = "message" + (isMe ? " self" : "");

  // Avatar
  const avatar = document.createElement("img");
  avatar.className = "chat-avatar";
  avatar.src = `https://api.dicebear.com/6.x/avataaars/svg?seed=${encodeURIComponent(
    msg.sender
  )}`;
  avatar.alt = msg.sender;

  // Khối nội dung tin nhắn
  const messageBubble = document.createElement("div");
  messageBubble.className = "bubble";

  if (msg.content.startsWith("data:image/")) {
    // Ảnh upload
    messageBubble.innerHTML = `<img src="${msg.content}" style="max-width: 200px; border-radius: 12px; box-shadow: 0 2px 8px rgba(99,102,241,0.08);" />`;
  } else if (msg.content.match(/\.(png|jpg|jpeg|gif)$/i)) {
    // Ảnh dạng URL
    messageBubble.innerHTML = `<img src="${msg.content}" style="max-width: 120px; border-radius: 10px;" />`;
  } else {
    // Tin nhắn text
    messageBubble.innerHTML =
      (!isMe
        ? `<span style='font-size:0.95em;color:#6366f1;font-weight:600;'>${msg.sender}</span><br>`
        : "") + msg.content;
  }

  // Đối phương (không có .self): avatar trái + bubble
  // Mình (có .self): bubble + avatar phải
  if (isMe) {
    item.appendChild(messageBubble);
    item.appendChild(avatar);
  } else {
    item.appendChild(avatar);
    item.appendChild(messageBubble);
  }
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}

// Cho phép hàm sticker sử dụng toàn cục
window.sendSticker = sendSticker;
