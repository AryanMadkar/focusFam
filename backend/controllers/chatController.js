const ChatMessage = require("../models/ChatMessage");
const User = require("../models/userSchema");
const io = require("socket.io");

let activeUsers = new Map();

module.exports = (server) => {
  const socketServer = io(server, {
    cors: { origin: "*" },
  });

  socketServer.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // User joins a chat room
    socket.on("joinRoom", async ({ userId, roomId }) => {
      const user = await User.findById(userId);
      if (!user) return;

      socket.join(roomId);
      activeUsers.set(userId, socket.id);
      socketServer.to(roomId).emit("userJoined", { userId });
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ senderId, receiverId, roomId, message }) => {
      const newMessage = new ChatMessage({ sender: senderId, receiver: receiverId, roomId, message });
      await newMessage.save();

      socketServer.to(roomId).emit("receiveMessage", newMessage);
    });

    // Typing indicator
    socket.on("userTyping", ({ userId, roomId }) => {
      socketServer.to(roomId).emit("typingIndicator", { userId });
    });

    // Mark messages as seen
    socket.on("markAsSeen", async ({ messageId }) => {
      await ChatMessage.findByIdAndUpdate(messageId, { seen: true });
    });

    // Delete message
    socket.on("deleteMessage", async ({ messageId }) => {
      await ChatMessage.findByIdAndUpdate(messageId, { deleted: true });
    });

    // Disconnect user
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      activeUsers.delete(socket.id);
    });
  });
};
