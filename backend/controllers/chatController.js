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
      try {
        const user = await User.findById(userId);
        if (!user) return;

        socket.join(roomId);
        activeUsers.set(userId, socket.id);
        socketServer.to(roomId).emit("userJoined", { userId });
      } catch (err) {
        socket.emit("error", { message: "Failed to join room." });
      }
    });

    // Handle sending messages
    socket.on("sendMessage", async ({ senderId, receiverId, roomId, message }) => {
      try {
        const newMessage = new ChatMessage({ sender: senderId, receiver: receiverId, roomId, message });
        await newMessage.save();
        socketServer.to(roomId).emit("receiveMessage", newMessage);
      } catch (err) {
        socket.emit("error", { message: "Failed to send message." });
      }
    });

    // Typing indicator
    socket.on("userTyping", ({ userId, roomId }) => {
      try {
        socketServer.to(roomId).emit("typingIndicator", { userId });
      } catch (err) {
        socket.emit("error", { message: "Typing indicator error." });
      }
    });

    // Mark messages as seen
    socket.on("markAsSeen", async ({ messageId }) => {
      try {
        await ChatMessage.findByIdAndUpdate(messageId, { seen: true });
      } catch (err) {
        socket.emit("error", { message: "Failed to mark as seen." });
      }
    });

    // Delete message
    socket.on("deleteMessage", async ({ messageId }) => {
      try {
        await ChatMessage.findByIdAndUpdate(messageId, { deleted: true });
      } catch (err) {
        socket.emit("error", { message: "Failed to delete message." });
      }
    });

    // Disconnect user
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Remove user from activeUsers by userId
      for (const [userId, sockId] of activeUsers.entries()) {
        if (sockId === socket.id) {
          activeUsers.delete(userId);
          break;
        }
      }
    });
  });
};
