/**
 * Mock in-memory database for testing without MongoDB
 * Stores data in memory - use only for development/testing
 */

let users = [];
let complaints = [];
let feedback = [];
let chats = [];
let nextUserId = 1;
let nextComplaintId = 1;
let nextFeedbackId = 1;
let nextChatId = 1;

const mockDB = {
  // User operations
  users: {
    create: async (data) => {
      const user = { _id: nextUserId++, ...data, createdAt: new Date() };
      users.push(user);
      return user;
    },
    findOne: async (query) => {
      return users.find(u => {
        for (let key in query) {
          if (u[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findById: async (id) => {
      return users.find(u => u._id === id);
    },
    find: async (query = {}) => {
      return users.filter(u => {
        for (let key in query) {
          if (u[key] !== query[key]) return false;
        }
        return true;
      });
    },
  },

  // Complaint operations
  complaints: {
    create: async (data) => {
      const complaint = { _id: nextComplaintId++, ...data, createdAt: new Date() };
      complaints.push(complaint);
      return complaint;
    },
    findById: async (id) => {
      return complaints.find(c => c._id === id);
    },
    find: async (query = {}) => {
      return complaints.filter(c => {
        for (let key in query) {
          if (c[key] !== query[key]) return false;
        }
        return true;
      });
    },
    findByIdAndUpdate: async (id, data) => {
      const complaint = complaints.find(c => c._id === id);
      if (complaint) {
        Object.assign(complaint, data, { updatedAt: new Date() });
      }
      return complaint;
    },
    findByIdAndDelete: async (id) => {
      const idx = complaints.findIndex(c => c._id === id);
      if (idx !== -1) {
        return complaints.splice(idx, 1)[0];
      }
      return null;
    },
  },

  // Feedback operations
  feedback: {
    create: async (data) => {
      const fb = { _id: nextFeedbackId++, ...data, createdAt: new Date() };
      feedback.push(fb);
      return fb;
    },
    find: async (query = {}) => {
      return feedback.filter(f => {
        for (let key in query) {
          if (f[key] !== query[key]) return false;
        }
        return true;
      });
    },
  },

  // Chat operations
  chats: {
    create: async (data) => {
      const chat = { _id: nextChatId++, ...data, createdAt: new Date() };
      chats.push(chat);
      return chat;
    },
    find: async (query = {}) => {
      return chats.filter(c => {
        for (let key in query) {
          if (c[key] !== query[key]) return false;
        }
        return true;
      });
    },
  },

  // Utility
  clear: () => {
    users = [];
    complaints = [];
    feedback = [];
    chats = [];
    nextUserId = 1;
    nextComplaintId = 1;
    nextFeedbackId = 1;
    nextChatId = 1;
  },
};

module.exports = mockDB;
