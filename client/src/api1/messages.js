import { api, normalizeList } from "./client";

export const sendMessage = (data) => api.post("/messages", data);

export const getUserConversations = async (userId) => {
  const res = await api.get(`/messages/conversations/${encodeURIComponent(userId)}`);
  return normalizeList(res);
};

export const markMessageAsRead = (messageId) =>
  api.patch(`/messages/${encodeURIComponent(messageId)}/read`, {});

export const getUnreadCount = (userId) =>
  api.get(`/messages/unread/${encodeURIComponent(userId)}`);